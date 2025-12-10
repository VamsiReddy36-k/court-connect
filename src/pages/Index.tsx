import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, ShoppingBag, Clock, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import { courts, coaches, equipment } from '@/data/mockData';

const features = [
  {
    icon: Calendar,
    title: 'Easy Booking',
    description: 'Book courts, equipment, and coaches in one seamless flow',
  },
  {
    icon: Clock,
    title: 'Real-time Availability',
    description: 'See live availability and book instantly',
  },
  {
    icon: ShoppingBag,
    title: 'Equipment Rental',
    description: 'Quality rackets and shoes available for rent',
  },
  {
    icon: Users,
    title: 'Expert Coaches',
    description: 'Learn from our experienced coaching staff',
  },
];

const Index = () => {
  const activeIndoorCourts = courts.filter(c => c.type === 'indoor' && c.isActive).length;
  const activeOutdoorCourts = courts.filter(c => c.type === 'outdoor' && c.isActive).length;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.1),transparent_50%)]" />
        
        <div className="container relative py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <Badge variant="premium" className="mb-6">
              <Star className="h-3 w-3 mr-1" />
              #1 Badminton Facility
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Book Your Perfect{' '}
              <span className="text-primary">Badminton</span> Session
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {activeIndoorCourts + activeOutdoorCourts} professional courts, premium equipment, and expert coaches. 
              Everything you need for the perfect game.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book">
                <Button variant="hero" size="xl">
                  Book Now
                  <ArrowRight className="h-5 w-5 ml-1" />
                </Button>
              </Link>
              <Link to="/admin">
                <Button variant="outline" size="xl">
                  View Admin Panel
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">{activeIndoorCourts}</div>
              <div className="text-sm text-muted-foreground">Indoor Courts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-success">{activeOutdoorCourts}</div>
              <div className="text-sm text-muted-foreground">Outdoor Courts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent">{coaches.filter(c => c.isActive).length}</div>
              <div className="text-sm text-muted-foreground">Expert Coaches</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground">{equipment.filter(e => e.isActive).length}</div>
              <div className="text-sm text-muted-foreground">Equipment Items</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose CourtBook?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We've made booking your badminton sessions as easy as possible
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} variant="interactive" className="text-center">
                <CardHeader>
                  <div className="mx-auto h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courts Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Courts</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional-grade courts for players of all levels
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courts.filter(c => c.isActive).map((court) => (
              <Card key={court.id} variant="elevated">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{court.name}</CardTitle>
                    <Badge variant={court.type === 'indoor' ? 'indoor' : 'outdoor'}>
                      {court.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{court.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">${court.basePrice}</span>
                    <span className="text-sm text-muted-foreground">/hour</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/book">
              <Button variant="default" size="lg">
                View Availability & Book
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Coaches Preview */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Coaches</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn from the best with our experienced coaching team
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {coaches.filter(c => c.isActive).map((coach) => (
              <Card key={coach.id} variant="elevated">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 rounded-full gradient-accent flex items-center justify-center text-accent-foreground font-bold text-lg">
                      {coach.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <CardTitle>{coach.name}</CardTitle>
                      <CardDescription>{coach.specialization}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="font-semibold">{coach.rating}</span>
                    </div>
                    <div>
                      <span className="text-xl font-bold">${coach.pricePerHour}</span>
                      <span className="text-sm text-muted-foreground">/hour</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Play?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Book your court now and experience the best badminton facility in town
          </p>
          <Link to="/book">
            <Button variant="hero" size="xl">
              Start Booking
              <ArrowRight className="h-5 w-5 ml-1" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
