import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { coaches as initialCoaches } from '@/data/mockData';
import { Coach } from '@/types/booking';
import { Plus, Pencil, Star, Clock } from 'lucide-react';
import { toast } from 'sonner';

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function CoachesAdmin() {
  const [coaches, setCoaches] = useState<Coach[]>(initialCoaches);

  const toggleCoachStatus = (coachId: string) => {
    setCoaches((prev) =>
      prev.map((coach) =>
        coach.id === coachId ? { ...coach, isActive: !coach.isActive } : coach
      )
    );
    toast.success('Coach status updated');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Coaches Management</h2>
          <p className="text-sm text-muted-foreground">
            Manage coach profiles and availability schedules
          </p>
        </div>
        <Button variant="default">
          <Plus className="h-4 w-4 mr-2" />
          Add Coach
        </Button>
      </div>

      <div className="grid gap-4">
        {coaches.map((coach) => (
          <Card
            key={coach.id}
            variant={coach.isActive ? 'elevated' : 'default'}
            className={!coach.isActive ? 'opacity-60' : ''}
          >
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Coach Info */}
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full gradient-accent flex items-center justify-center text-accent-foreground font-bold text-xl shrink-0">
                    {coach.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg">{coach.name}</h3>
                      <div className="flex items-center gap-1 text-warning">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium">{coach.rating}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {coach.specialization}
                    </p>
                    <div className="mt-1">
                      <span className="text-lg font-bold">${coach.pricePerHour}</span>
                      <span className="text-sm text-muted-foreground">/hour</span>
                    </div>
                  </div>
                </div>

                {/* Availability */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Availability</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {coach.availability.map((avail, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {dayNames[avail.dayOfWeek]} {avail.startTime}-{avail.endTime}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <Switch
                    checked={coach.isActive}
                    onCheckedChange={() => toggleCoachStatus(coach.id)}
                  />
                  <Button variant="outline" size="sm">
                    <Pencil className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
