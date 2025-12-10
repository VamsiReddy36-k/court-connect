import { useBookingStore } from '@/hooks/useBookingStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { courts } from '@/data/mockData';
import { Check, Wifi, Sun } from 'lucide-react';

export function CourtStep() {
  const { selection, setCourt } = useBookingStore();

  const activeCourts = courts.filter((c) => c.isActive);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2">Select a Court</h2>
        <p className="text-muted-foreground text-sm">
          Choose from our available courts. Indoor courts include climate control.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {activeCourts.map((court) => {
          const isSelected = selection.court?.id === court.id;
          const isIndoor = court.type === 'indoor';

          return (
            <Card
              key={court.id}
              variant={isSelected ? 'highlight' : 'interactive'}
              onClick={() => setCourt(court)}
              className={cn(
                'relative overflow-hidden',
                isSelected && 'ring-2 ring-primary'
              )}
            >
              {isSelected && (
                <div className="absolute top-3 right-3">
                  <div className="h-6 w-6 rounded-full gradient-primary flex items-center justify-center">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                </div>
              )}

              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'h-10 w-10 rounded-lg flex items-center justify-center',
                      isIndoor
                        ? 'bg-primary/10 text-primary'
                        : 'bg-success/10 text-success'
                    )}
                  >
                    {isIndoor ? (
                      <Wifi className="h-5 w-5" />
                    ) : (
                      <Sun className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{court.name}</CardTitle>
                    <Badge
                      variant={isIndoor ? 'indoor' : 'outdoor'}
                      className="mt-1"
                    >
                      {court.type}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <CardDescription className="mb-4">
                  {court.description}
                </CardDescription>

                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">${court.basePrice}</span>
                  <span className="text-sm text-muted-foreground">/hour</span>
                </div>

                {isIndoor && (
                  <p className="text-xs text-accent mt-2">
                    +20% indoor premium applies
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
