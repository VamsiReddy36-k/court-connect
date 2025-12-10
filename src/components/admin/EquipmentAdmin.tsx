import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { equipment as initialEquipment } from '@/data/mockData';
import { Equipment } from '@/types/booking';
import { Plus, Pencil, Package } from 'lucide-react';
import { toast } from 'sonner';

export function EquipmentAdmin() {
  const [equipment, setEquipment] = useState<Equipment[]>(initialEquipment);

  const toggleEquipmentStatus = (equipmentId: string) => {
    setEquipment((prev) =>
      prev.map((item) =>
        item.id === equipmentId ? { ...item, isActive: !item.isActive } : item
      )
    );
    toast.success('Equipment status updated');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'racket':
        return '🏸';
      case 'shoes':
        return '👟';
      default:
        return '📦';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Equipment Inventory</h2>
          <p className="text-sm text-muted-foreground">
            Manage rental equipment and track availability
          </p>
        </div>
        <Button variant="default">
          <Plus className="h-4 w-4 mr-2" />
          Add Equipment
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {equipment.map((item) => {
          const availabilityPercent = (item.availableQuantity / item.quantity) * 100;

          return (
            <Card
              key={item.id}
              variant={item.isActive ? 'elevated' : 'default'}
              className={!item.isActive ? 'opacity-60' : ''}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-xl">
                      {getTypeIcon(item.type)}
                    </div>
                    <div>
                      <CardTitle className="text-base">{item.name}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {item.type}
                      </Badge>
                    </div>
                  </div>
                  <Switch
                    checked={item.isActive}
                    onCheckedChange={() => toggleEquipmentStatus(item.id)}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Availability</span>
                    <span className="font-medium">
                      {item.availableQuantity} / {item.quantity}
                    </span>
                  </div>
                  <Progress
                    value={availabilityPercent}
                    className="h-2"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold">${item.pricePerHour}</span>
                    <span className="text-sm text-muted-foreground">/hour</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Pencil className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
