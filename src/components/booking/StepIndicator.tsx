import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface Step {
  number: number;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200',
                currentStep > step.number
                  ? 'gradient-primary text-primary-foreground'
                  : currentStep === step.number
                  ? 'bg-primary text-primary-foreground shadow-glow'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {currentStep > step.number ? (
                <Check className="h-5 w-5" />
              ) : (
                step.number
              )}
            </div>
            <span
              className={cn(
                'text-xs mt-2 hidden sm:block',
                currentStep >= step.number
                  ? 'text-foreground font-medium'
                  : 'text-muted-foreground'
              )}
            >
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                'h-0.5 w-8 sm:w-16 mx-2',
                currentStep > step.number ? 'bg-primary' : 'bg-muted'
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
