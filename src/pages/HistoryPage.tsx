import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { sampleBookings, courts, coaches, equipment } from '@/data/mockData';
import { format, parseISO } from 'date-fns';
import { Calendar, Clock, MapPin, Users, ShoppingBag, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';

const HistoryPage = () => {
  const getCourtById = (id: string) => courts.find((c) => c.id === id);
  const getCoachById = (id: string) => coaches.find((c) => c.id === id);
  const getEquipmentById = (id: string) => equipment.find((e) => e.id === id);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'completed':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
            <p className="text-muted-foreground">
              View and manage your court reservations
            </p>
          </div>
          <Link to="/book">
            <Button variant="hero">New Booking</Button>
          </Link>
        </div>

        {sampleBookings.length === 0 ? (
          <Card variant="elevated" className="text-center py-12">
            <CardContent>
              <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">No bookings yet</h2>
              <p className="text-muted-foreground mb-6">
                You haven't made any court reservations yet.
              </p>
              <Link to="/book">
                <Button variant="default">Book Your First Court</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {sampleBookings.map((booking) => {
              const court = getCourtById(booking.courtId);
              const coach = booking.coachId ? getCoachById(booking.coachId) : null;
              const bookingEquipment = booking.equipment
                .map(getEquipmentById)
                .filter(Boolean);

              return (
                <Card key={booking.id} variant="elevated">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Date/Time */}
                      <div className="flex items-center gap-4 md:w-48">
                        <div className="h-14 w-14 rounded-xl gradient-primary flex flex-col items-center justify-center text-primary-foreground">
                          <span className="text-xs font-medium">
                            {format(parseISO(booking.date), 'MMM')}
                          </span>
                          <span className="text-xl font-bold leading-none">
                            {format(parseISO(booking.date), 'd')}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold">
                            {format(parseISO(booking.date), 'EEEE')}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {booking.startTime} - {booking.endTime}
                          </p>
                        </div>
                      </div>

                      {/* Court & Details */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{court?.name}</span>
                          <Badge variant={court?.type === 'indoor' ? 'indoor' : 'outdoor'}>
                            {court?.type}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {coach && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Users className="h-3 w-3" />
                              Coach: {coach.name}
                            </div>
                          )}
                          {bookingEquipment.length > 0 && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <ShoppingBag className="h-3 w-3" />
                              {bookingEquipment.length} equipment
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Status & Price */}
                      <div className="flex items-center gap-4 md:text-right">
                        <div>
                          <Badge variant={getStatusVariant(booking.status) as any}>
                            {booking.status}
                          </Badge>
                          <p className="text-xl font-bold mt-1">
                            ${booking.totalPrice.toFixed(2)}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HistoryPage;
