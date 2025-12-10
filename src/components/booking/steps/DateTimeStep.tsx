import { useBookingStore } from '@/hooks/useBookingStore';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { timeSlots } from '@/data/mockData';
import { format, addDays, isBefore, startOfDay } from 'date-fns';
import { Clock, Sun, Moon } from 'lucide-react';

export function DateTimeStep() {
  const { selection, setDate, setTimeSlot } = useBookingStore();

  const today = startOfDay(new Date());
  const maxDate = addDays(today, 30);

  const isPeakHour = (time: string) => {
    const hour = parseInt(time.split(':')[0]);
    return hour >= 18 && hour < 21;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2">Select Date & Time</h2>
        <p className="text-muted-foreground text-sm">
          Choose when you'd like to play. Bookings available up to 30 days in advance.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendar */}
        <Card>
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={selection.date || undefined}
              onSelect={(date) => setDate(date || null)}
              disabled={(date) => isBefore(date, today) || date > maxDate}
              className="rounded-md"
            />
          </CardContent>
        </Card>

        {/* Time Slots */}
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-warning" />
              <span>Regular hours</span>
            </div>
            <div className="flex items-center gap-2">
              <Moon className="h-4 w-4 text-accent" />
              <span>Peak hours (+50%)</span>
            </div>
          </div>

          {selection.date ? (
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((slot) => {
                const isPeak = isPeakHour(slot.startTime);
                const isSelected =
                  selection.timeSlot?.startTime === slot.startTime;

                return (
                  <button
                    key={slot.startTime}
                    onClick={() =>
                      setTimeSlot({ ...slot, isAvailable: true })
                    }
                    className={cn(
                      'p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200',
                      'hover:border-primary hover:bg-primary/5',
                      isSelected
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-card',
                      isPeak && !isSelected && 'border-accent/30 bg-accent/5'
                    )}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>
                        {slot.startTime} - {slot.endTime}
                      </span>
                    </div>
                    {isPeak && (
                      <Badge variant="accent" className="mt-1 text-xs">
                        Peak
                      </Badge>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 text-muted-foreground">
              <p>Select a date to view available time slots</p>
            </div>
          )}
        </div>
      </div>

      {selection.date && selection.timeSlot && (
        <div className="p-4 rounded-lg bg-success/10 border border-success/20">
          <p className="text-sm font-medium text-success">
            ✓ {format(selection.date, 'EEEE, MMMM d')} at{' '}
            {selection.timeSlot.startTime} - {selection.timeSlot.endTime}
          </p>
        </div>
      )}
    </div>
  );
}
