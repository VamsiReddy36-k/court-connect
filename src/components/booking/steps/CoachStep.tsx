import { useBookingStore } from '@/hooks/useBookingStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { coaches } from '@/data/mockData';
import { Check, Star, Clock, X } from 'lucide-react';

export function CoachStep() {
  const { selection, setCoach } = useBookingStore();

  const activeCoaches = coaches.filter((c) => c.isActive);

  const isCoachAvailable = (coach: typeof coaches[0]) => {
    if (!selection.date || !selection.timeSlot) return false;

    const dayOfWeek = selection.date.getDay();
    const slotStart = selection.timeSlot.startTime;

    return coach.availability.some((avail) => {
      if (avail.dayOfWeek !== dayOfWeek) return false;
      return slotStart >= avail.startTime && slotStart < avail.endTime;
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2">Book a Coach (Optional)</h2>
        <p className="text-muted-foreground text-sm">
          Level up your game with a private session from our experienced coaches.
        </p>
      </div>

      {selection.coach && (
        <div className="flex items-center justify-between p-4 rounded-lg bg-success/10 border border-success/20">
          <p className="text-sm font-medium text-success">
            ✓ Coach {selection.coach.name} selected
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCoach(null)}
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="h-4 w-4" />
            Remove
          </Button>
        </div>
      )}

      <div className="grid gap-4">
        {activeCoaches.map((coach) => {
          const isSelected = selection.coach?.id === coach.id;
          const isAvailable = isCoachAvailable(coach);

          return (
            <Card
              key={coach.id}
              variant={isSelected ? 'highlight' : isAvailable ? 'interactive' : 'default'}
              onClick={() => isAvailable && setCoach(isSelected ? null : coach)}
              className={cn(
                'relative',
                isSelected && 'ring-2 ring-primary',
                !isAvailable && 'opacity-50 cursor-not-allowed'
              )}
            >
              {isSelected && (
                <div className="absolute top-4 right-4">
                  <div className="h-6 w-6 rounded-full gradient-primary flex items-center justify-center">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                </div>
              )}

              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-full gradient-accent flex items-center justify-center text-accent-foreground font-bold text-xl shrink-0">
                    {coach.name.split(' ').map((n) => n[0]).join('')}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{coach.name}</h3>
                      <div className="flex items-center gap-1 text-warning">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium">{coach.rating}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm mb-3">
                      {coach.specialization}
                    </p>

                    <div className="flex items-center gap-4">
                      <div>
                        <span className="text-xl font-bold">${coach.pricePerHour}</span>
                        <span className="text-sm text-muted-foreground">/hour</span>
                      </div>

                      <Badge variant={isAvailable ? 'success' : 'secondary'}>
                        {isAvailable ? 'Available' : 'Not available'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => setCoach(null)}
          className="text-muted-foreground"
        >
          Skip - I don't need a coach
        </Button>
      </div>
    </div>
  );
}
