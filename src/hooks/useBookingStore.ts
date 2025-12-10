import { create } from 'zustand';
import { BookingSelection, Court, Equipment, Coach, TimeSlot, PriceBreakdown, PricingRule } from '@/types/booking';
import { pricingRules } from '@/data/mockData';

interface BookingStore {
  selection: BookingSelection;
  step: number;
  setDate: (date: Date | null) => void;
  setTimeSlot: (slot: TimeSlot | null) => void;
  setCourt: (court: Court | null) => void;
  toggleEquipment: (equipment: Equipment) => void;
  setCoach: (coach: Coach | null) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  resetBooking: () => void;
  calculatePrice: () => PriceBreakdown;
}

const initialSelection: BookingSelection = {
  date: null,
  timeSlot: null,
  court: null,
  equipment: [],
  coach: null,
};

export const useBookingStore = create<BookingStore>((set, get) => ({
  selection: initialSelection,
  step: 1,

  setDate: (date) =>
    set((state) => ({
      selection: { ...state.selection, date, timeSlot: null },
    })),

  setTimeSlot: (timeSlot) =>
    set((state) => ({
      selection: { ...state.selection, timeSlot },
    })),

  setCourt: (court) =>
    set((state) => ({
      selection: { ...state.selection, court },
    })),

  toggleEquipment: (equipment) =>
    set((state) => {
      const exists = state.selection.equipment.find((e) => e.id === equipment.id);
      const newEquipment = exists
        ? state.selection.equipment.filter((e) => e.id !== equipment.id)
        : [...state.selection.equipment, equipment];
      return {
        selection: { ...state.selection, equipment: newEquipment },
      };
    }),

  setCoach: (coach) =>
    set((state) => ({
      selection: { ...state.selection, coach },
    })),

  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 5) })),

  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),

  goToStep: (step) => set({ step }),

  resetBooking: () => set({ selection: initialSelection, step: 1 }),

  calculatePrice: () => {
    const { selection } = get();
    const breakdown: PriceBreakdown = {
      courtPrice: 0,
      equipmentPrice: 0,
      coachPrice: 0,
      appliedRules: [],
      subtotal: 0,
      total: 0,
    };

    if (!selection.court) return breakdown;

    // Base court price
    breakdown.courtPrice = selection.court.basePrice;

    // Equipment prices
    breakdown.equipmentPrice = selection.equipment.reduce(
      (sum, eq) => sum + eq.pricePerHour,
      0
    );

    // Coach price
    if (selection.coach) {
      breakdown.coachPrice = selection.coach.pricePerHour;
    }

    // Apply pricing rules
    const activeRules = pricingRules.filter((rule) => rule.isActive);
    let courtMultiplier = 1;

    activeRules.forEach((rule) => {
      let applies = false;

      if (rule.type === 'peak_hours' && selection.timeSlot) {
        const slotHour = parseInt(selection.timeSlot.startTime.split(':')[0]);
        const startHour = parseInt(rule.conditions.startTime?.split(':')[0] || '0');
        const endHour = parseInt(rule.conditions.endTime?.split(':')[0] || '24');
        applies = slotHour >= startHour && slotHour < endHour;
      }

      if (rule.type === 'weekend' && selection.date) {
        const dayOfWeek = selection.date.getDay();
        applies = rule.conditions.daysOfWeek?.includes(dayOfWeek) || false;
      }

      if (rule.type === 'indoor_premium' && selection.court) {
        applies = selection.court.type === rule.conditions.courtType;
      }

      if (applies) {
        const additionalAmount = breakdown.courtPrice * (rule.multiplier - 1);
        courtMultiplier *= rule.multiplier;
        breakdown.appliedRules.push({ rule, amount: additionalAmount });
      }
    });

    const adjustedCourtPrice = breakdown.courtPrice * courtMultiplier;
    breakdown.subtotal =
      breakdown.courtPrice + breakdown.equipmentPrice + breakdown.coachPrice;
    breakdown.total =
      adjustedCourtPrice + breakdown.equipmentPrice + breakdown.coachPrice;

    return breakdown;
  },
}));
