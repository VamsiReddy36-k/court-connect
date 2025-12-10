import { useBookingStore } from '@/hooks/useBookingStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DateTimeStep } from './steps/DateTimeStep';
import { CourtStep } from './steps/CourtStep';
import { EquipmentStep } from './steps/EquipmentStep';
import { CoachStep } from './steps/CoachStep';
import { ConfirmationStep } from './steps/ConfirmationStep';
import { PriceSummary } from './PriceSummary';
import { StepIndicator } from './StepIndicator';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const steps = [
  { number: 1, title: 'Date & Time', component: DateTimeStep },
  { number: 2, title: 'Select Court', component: CourtStep },
  { number: 3, title: 'Equipment', component: EquipmentStep },
  { number: 4, title: 'Coach', component: CoachStep },
  { number: 5, title: 'Confirm', component: ConfirmationStep },
];

export function BookingWizard() {
  const { step, nextStep, prevStep, selection } = useBookingStore();

  const CurrentStepComponent = steps[step - 1].component;

  const canProceed = () => {
    switch (step) {
      case 1:
        return selection.date && selection.timeSlot;
      case 2:
        return selection.court;
      case 3:
      case 4:
        return true; // Equipment and coach are optional
      default:
        return true;
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <StepIndicator steps={steps} currentStep={step} />
        
        <Card variant="elevated">
          <CardContent className="p-6">
            <CurrentStepComponent />
          </CardContent>
        </Card>

        {step < 5 && (
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={step === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button
              variant="hero"
              onClick={nextStep}
              disabled={!canProceed()}
            >
              {step === 4 ? 'Review Booking' : 'Continue'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-24">
          <PriceSummary />
        </div>
      </div>
    </div>
  );
}
