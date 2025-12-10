import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { pricingRules as initialRules } from '@/data/mockData';
import { PricingRule } from '@/types/booking';
import { Plus, Pencil, Clock, Calendar, Wifi, Tag } from 'lucide-react';
import { toast } from 'sonner';

export function PricingAdmin() {
  const [rules, setRules] = useState<PricingRule[]>(initialRules);

  const toggleRuleStatus = (ruleId: string) => {
    setRules((prev) =>
      prev.map((rule) =>
        rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule
      )
    );
    toast.success('Pricing rule updated');
  };

  const getRuleIcon = (type: string) => {
    switch (type) {
      case 'peak_hours':
        return <Clock className="h-5 w-5" />;
      case 'weekend':
        return <Calendar className="h-5 w-5" />;
      case 'indoor_premium':
        return <Wifi className="h-5 w-5" />;
      default:
        return <Tag className="h-5 w-5" />;
    }
  };

  const getRuleDescription = (rule: PricingRule) => {
    switch (rule.type) {
      case 'peak_hours':
        return `Applies during ${rule.conditions.startTime} - ${rule.conditions.endTime}`;
      case 'weekend':
        return `Applies on Saturday and Sunday`;
      case 'indoor_premium':
        return `Applies to indoor courts only`;
      default:
        return 'Custom pricing rule';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Pricing Rules</h2>
          <p className="text-sm text-muted-foreground">
            Configure dynamic pricing multipliers
          </p>
        </div>
        <Button variant="default">
          <Plus className="h-4 w-4 mr-2" />
          Add Rule
        </Button>
      </div>

      {/* Info Card */}
      <Card variant="highlight">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Tag className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">How Pricing Works</p>
              <p className="text-sm text-muted-foreground">
                Pricing rules stack together. If multiple rules apply, all multipliers are combined.
                For example: Indoor court (1.2x) + Peak hours (1.5x) + Weekend (1.25x) = 2.25x total.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rules.map((rule) => (
          <Card
            key={rule.id}
            variant={rule.isActive ? 'elevated' : 'default'}
            className={!rule.isActive ? 'opacity-60' : ''}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                    {getRuleIcon(rule.type)}
                  </div>
                  <CardTitle className="text-base">{rule.name}</CardTitle>
                </div>
                <Switch
                  checked={rule.isActive}
                  onCheckedChange={() => toggleRuleStatus(rule.id)}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription>{getRuleDescription(rule)}</CardDescription>

              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="accent" className="text-sm">
                    +{((rule.multiplier - 1) * 100).toFixed(0)}%
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    Multiplier: {rule.multiplier}x
                  </p>
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

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Pricing Examples</CardTitle>
          <CardDescription>See how pricing rules affect court rates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="font-medium mb-2">Outdoor Court (Weekday, 2PM)</p>
              <p className="text-muted-foreground">Base: $20</p>
              <p className="text-lg font-bold text-primary">= $20</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="font-medium mb-2">Indoor Court (Weekday, 7PM)</p>
              <p className="text-muted-foreground">Base: $30 × 1.2 × 1.5</p>
              <p className="text-lg font-bold text-primary">= $54</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="font-medium mb-2">Indoor Court (Saturday, 7PM)</p>
              <p className="text-muted-foreground">Base: $30 × 1.2 × 1.5 × 1.25</p>
              <p className="text-lg font-bold text-primary">= $67.50</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
