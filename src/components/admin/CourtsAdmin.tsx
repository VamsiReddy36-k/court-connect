import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { courts as initialCourts } from '@/data/mockData';
import { Court } from '@/types/booking';
import { Plus, Pencil, Wifi, Sun } from 'lucide-react';
import { toast } from 'sonner';

export function CourtsAdmin() {
  const [courts, setCourts] = useState<Court[]>(initialCourts);

  const toggleCourtStatus = (courtId: string) => {
    setCourts((prev) =>
      prev.map((court) =>
        court.id === courtId ? { ...court, isActive: !court.isActive } : court
      )
    );
    toast.success('Court status updated');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Courts Management</h2>
          <p className="text-sm text-muted-foreground">
            Add, edit, or disable badminton courts
          </p>
        </div>
        <Button variant="default">
          <Plus className="h-4 w-4 mr-2" />
          Add Court
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {courts.map((court) => (
          <Card key={court.id} variant={court.isActive ? 'elevated' : 'default'} className={!court.isActive ? 'opacity-60' : ''}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      court.type === 'indoor'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-success/10 text-success'
                    }`}
                  >
                    {court.type === 'indoor' ? (
                      <Wifi className="h-5 w-5" />
                    ) : (
                      <Sun className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{court.name}</CardTitle>
                    <Badge variant={court.type === 'indoor' ? 'indoor' : 'outdoor'}>
                      {court.type}
                    </Badge>
                  </div>
                </div>
                <Switch
                  checked={court.isActive}
                  onCheckedChange={() => toggleCourtStatus(court.id)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {court.description}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold">${court.basePrice}</span>
                  <span className="text-sm text-muted-foreground">/hour</span>
                </div>
                <Button variant="outline" size="sm">
                  <Pencil className="h-3 w-3 mr-1" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
