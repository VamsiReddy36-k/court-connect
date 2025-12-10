import { useBookingStore } from '@/hooks/useBookingStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, MapPin, ShoppingBag, Users, Tag } from 'lucide-react';
import { format } from 'date-fns';

export function PriceSummary() {
  const { selection, calculatePrice } = useBookingStore();
  const priceBreakdown = calculatePrice();

  return (
    <Card variant="highlight">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5" />
          Booking Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Selected Items */}
        <div className="space-y-3">
          {selection.date && (
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{format(selection.date, 'EEEE, MMMM d, yyyy')}</span>
            </div>
          )}
          
          {selection.timeSlot && (
            <div className="flex items-center gap-3 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{selection.timeSlot.startTime} - {selection.timeSlot.endTime}</span>
            </div>
          )}

          {selection.court && (
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{selection.court.name}</span>
              <Badge variant={selection.court.type === 'indoor' ? 'indoor' : 'outdoor'} className="text-xs">
                {selection.court.type}
              </Badge>
            </div>
          )}

          {selection.equipment.length > 0 && (
            <div className="flex items-start gap-3 text-sm">
              <ShoppingBag className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div className="flex flex-wrap gap-1">
                {selection.equipment.map((eq) => (
                  <Badge key={eq.id} variant="secondary" className="text-xs">
                    {eq.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {selection.coach && (
            <div className="flex items-center gap-3 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{selection.coach.name}</span>
            </div>
          )}
        </div>

        {selection.court && (
          <>
            <Separator />

            {/* Price Breakdown */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Court ({selection.court.name})</span>
                <span>${priceBreakdown.courtPrice.toFixed(2)}</span>
              </div>

              {priceBreakdown.equipmentPrice > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Equipment</span>
                  <span>${priceBreakdown.equipmentPrice.toFixed(2)}</span>
                </div>
              )}

              {priceBreakdown.coachPrice > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Coach</span>
                  <span>${priceBreakdown.coachPrice.toFixed(2)}</span>
                </div>
              )}

              {priceBreakdown.appliedRules.length > 0 && (
                <>
                  <Separator className="my-2" />
                  {priceBreakdown.appliedRules.map(({ rule, amount }) => (
                    <div key={rule.id} className="flex justify-between text-accent">
                      <span>{rule.name} (+{((rule.multiplier - 1) * 100).toFixed(0)}%)</span>
                      <span>+${amount.toFixed(2)}</span>
                    </div>
                  ))}
                </>
              )}
            </div>

            <Separator />

            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total</span>
              <span className="text-2xl font-bold text-primary">
                ${priceBreakdown.total.toFixed(2)}
              </span>
            </div>
          </>
        )}

        {!selection.court && (
          <p className="text-sm text-muted-foreground text-center py-4">
            Select a court to see pricing
          </p>
        )}
      </CardContent>
    </Card>
  );
}
