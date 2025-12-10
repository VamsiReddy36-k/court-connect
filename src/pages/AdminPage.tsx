import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CourtsAdmin } from '@/components/admin/CourtsAdmin';
import { EquipmentAdmin } from '@/components/admin/EquipmentAdmin';
import { CoachesAdmin } from '@/components/admin/CoachesAdmin';
import { PricingAdmin } from '@/components/admin/PricingAdmin';
import { MapPin, ShoppingBag, Users, Tag } from 'lucide-react';

const AdminPage = () => {
  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">
            Manage courts, equipment, coaches, and pricing rules
          </p>
        </div>

        <Tabs defaultValue="courts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-auto p-1">
            <TabsTrigger value="courts" className="flex items-center gap-2 py-3">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Courts</span>
            </TabsTrigger>
            <TabsTrigger value="equipment" className="flex items-center gap-2 py-3">
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Equipment</span>
            </TabsTrigger>
            <TabsTrigger value="coaches" className="flex items-center gap-2 py-3">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Coaches</span>
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center gap-2 py-3">
              <Tag className="h-4 w-4" />
              <span className="hidden sm:inline">Pricing</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courts">
            <CourtsAdmin />
          </TabsContent>

          <TabsContent value="equipment">
            <EquipmentAdmin />
          </TabsContent>

          <TabsContent value="coaches">
            <CoachesAdmin />
          </TabsContent>

          <TabsContent value="pricing">
            <PricingAdmin />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminPage;
