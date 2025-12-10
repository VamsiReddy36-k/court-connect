export interface Court {
  id: string;
  name: string;
  type: 'indoor' | 'outdoor';
  isActive: boolean;
  basePrice: number;
  description?: string;
}

export interface Equipment {
  id: string;
  name: string;
  type: 'racket' | 'shoes' | 'other';
  quantity: number;
  availableQuantity: number;
  pricePerHour: number;
  isActive: boolean;
}

export interface Coach {
  id: string;
  name: string;
  specialization: string;
  pricePerHour: number;
  rating: number;
  imageUrl?: string;
  availability: CoachAvailability[];
  isActive: boolean;
}

export interface CoachAvailability {
  dayOfWeek: number; // 0-6, Sunday = 0
  startTime: string; // HH:MM
  endTime: string; // HH:MM
}

export interface PricingRule {
  id: string;
  name: string;
  type: 'peak_hours' | 'weekend' | 'indoor_premium' | 'custom';
  multiplier: number; // e.g., 1.5 for 50% increase
  isActive: boolean;
  conditions: PricingCondition;
}

export interface PricingCondition {
  startTime?: string; // HH:MM
  endTime?: string; // HH:MM
  daysOfWeek?: number[]; // 0-6
  courtType?: 'indoor' | 'outdoor';
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface BookingSelection {
  date: Date | null;
  timeSlot: TimeSlot | null;
  court: Court | null;
  equipment: Equipment[];
  coach: Coach | null;
}

export interface PriceBreakdown {
  courtPrice: number;
  equipmentPrice: number;
  coachPrice: number;
  appliedRules: { rule: PricingRule; amount: number }[];
  subtotal: number;
  total: number;
}

export interface Booking {
  id: string;
  userId: string;
  courtId: string;
  date: string;
  startTime: string;
  endTime: string;
  equipment: string[];
  coachId?: string;
  totalPrice: number;
  priceBreakdown: PriceBreakdown;
  status: 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

export interface WaitlistEntry {
  id: string;
  userId: string;
  courtId: string;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  notified: boolean;
}
