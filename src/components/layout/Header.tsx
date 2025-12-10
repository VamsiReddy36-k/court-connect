import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Settings, History, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/book', label: 'Book Now', icon: Calendar },
    { path: '/history', label: 'My Bookings', icon: History },
    { path: '/admin', label: 'Admin', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">🏸</span>
          </div>
          <span className="font-bold text-xl">CourtBook</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? 'subtle' : 'ghost'}
                  size="sm"
                  className={cn(
                    'gap-2',
                    isActive && 'font-semibold'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/book">
            <Button variant="hero" size="sm" className="hidden sm:flex">
              Book a Court
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
