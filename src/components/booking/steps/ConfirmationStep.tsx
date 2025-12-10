import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '@/hooks/useBookingStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, ShoppingBag, Users, CheckCircle2, Loader2 } from 'lucide-react';

export function ConfirmationStep() {
  const navigate = useNavigate();
  const { selection, calculatePrice, resetBooking } = useBookingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const priceBreakdown = calculatePrice();

  const handleConfirmBooking = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('Booking confirmed!', {
      description: `Your court is reserved for ${format(selection.date!, 'MMMM d')} at ${selection.timeSlot?.startTime}`,
    });

    resetBooking();
    navigate('/history');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2">Confirm Your Booking</h2>
        <p className="text-muted-foreground text-sm">
          Review your booking details before confirming.
        </p>
      </div>

      <Card variant="elevated">
        <CardHeader>
          <CardTitle className="text-lg">Booking Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Date & Time */}
          <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold">
                {selection.date && format(selection.date, 'EEEE, MMMM d, yyyy')}
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {selection.timeSlot?.startTime} - {selection.timeSlot?.endTime}
              </p>
            </div>
          </div>

          {/* Court */}
          {selection.court && (
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{selection.court.name}</p>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={selection.court.type === 'indoor' ? 'indoor' : 'outdoor'}
                  >
                    {selection.court.type}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    ${selection.court.basePrice}/hour
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Equipment */}
          {selection.equipment.length > 0 && (
            <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="font-semibold">Equipment Rental</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selection.equipment.map((eq) => (
                    <Badge key={eq.id} variant="secondary" className="text-xs">
                      {eq.name} (${eq.pricePerHour})
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Coach */}
          {selection.coach && (
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
              <div className="h-12 w-12 rounded-lg gradient-accent flex items-center justify-center text-accent-foreground font-bold">
                {selection.coach.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <p className="font-semibold">{selection.coach.name}</p>
                <p className="text-sm text-muted-foreground">
                  {selection.coach.specialization} - ${selection.coach.pricePerHour}/hour
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Price Summary */}
      <Card variant="highlight">
        <CardHeader>
          <CardTitle className="text-lg">Price Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Court ({selection.court?.name})</span>
            <span>${priceBreakdown.courtPrice.toFixed(2)}</span>
          </div>

          {priceBreakdown.equipmentPrice > 0 && (
            <div className="flex justify-between text-sm">
              <span>Equipment</span>
              <span>${priceBreakdown.equipmentPrice.toFixed(2)}</span>
            </div>
          )}

          {priceBreakdown.coachPrice > 0 && (
            <div className="flex justify-between text-sm">
              <span>Coach</span>
              <span>${priceBreakdown.coachPrice.toFixed(2)}</span>
            </div>
          )}

          {priceBreakdown.appliedRules.length > 0 && (
            <>
              <Separator />
              {priceBreakdown.appliedRules.map(({ rule, amount }) => (
                <div key={rule.id} className="flex justify-between text-sm text-accent">
                  <span>{rule.name}</span>
                  <span>+${amount.toFixed(2)}</span>
                </div>
              ))}
            </>
          )}

          <Separator />

          <div className="flex justify-between items-center pt-2">
            <span className="font-bold text-lg">Total</span>
            <span className="text-3xl font-bold text-primary">
              ${priceBreakdown.total.toFixed(2)}
            </span>
          </div>
        </CardContent>
      </Card>

      <Button
        variant="hero"
        size="xl"
        className="w-full"
        onClick={handleConfirmBooking}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CheckCircle2 className="h-5 w-5" />
            Confirm Booking - ${priceBreakdown.total.toFixed(2)}
          </>
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        By confirming, you agree to our booking terms and cancellation policy.
      </p>
    </div>
  );
}
