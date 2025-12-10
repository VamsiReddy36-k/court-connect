import { useBookingStore } from '@/hooks/useBookingStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { equipment } from '@/data/mockData';
import { Check, Minus, Plus } from 'lucide-react';

export function EquipmentStep() {
  const { selection, toggleEquipment } = useBookingStore();

  const activeEquipment = equipment.filter((e) => e.isActive);
  const rackets = activeEquipment.filter((e) => e.type === 'racket');
  const shoes = activeEquipment.filter((e) => e.type === 'shoes');

  const renderEquipmentItem = (item: typeof equipment[0]) => {
    const isSelected = selection.equipment.some((e) => e.id === item.id);
    const isAvailable = item.availableQuantity > 0;

    return (
      <Card
        key={item.id}
        variant={isSelected ? 'highlight' : isAvailable ? 'interactive' : 'default'}
        onClick={() => isAvailable && toggleEquipment(item)}
        className={cn(
          'relative',
          isSelected && 'ring-2 ring-primary',
          !isAvailable && 'opacity-50 cursor-not-allowed'
        )}
      >
        {isSelected && (
          <div className="absolute top-3 right-3">
            <div className="h-6 w-6 rounded-full gradient-primary flex items-center justify-center">
              <Check className="h-4 w-4 text-primary-foreground" />
            </div>
          </div>
        )}

        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">{item.name}</h4>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={isAvailable ? 'success' : 'destructive'} className="text-xs">
                  {item.availableQuantity} available
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold">${item.pricePerHour}</span>
              <span className="text-xs text-muted-foreground block">/hour</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2">Add Equipment (Optional)</h2>
        <p className="text-muted-foreground text-sm">
          Need gear? Rent our quality equipment. Skip this step if you have your own.
        </p>
      </div>

      {/* Rackets */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          🏸 Rackets
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {rackets.map(renderEquipmentItem)}
        </div>
      </div>

      {/* Shoes */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          👟 Court Shoes
        </h3>
        <div className="grid md:grid-cols-3 gap-3">
          {shoes.map(renderEquipmentItem)}
        </div>
      </div>

      {selection.equipment.length > 0 && (
        <div className="p-4 rounded-lg bg-success/10 border border-success/20">
          <p className="text-sm font-medium text-success">
            ✓ {selection.equipment.length} item(s) selected: $
            {selection.equipment.reduce((sum, e) => sum + e.pricePerHour, 0)}/hour
          </p>
        </div>
      )}
    </div>
  );
}
