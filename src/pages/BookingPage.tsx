import { Layout } from '@/components/layout/Layout';
import { BookingWizard } from '@/components/booking/BookingWizard';

const BookingPage = () => {
  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Book a Court</h1>
          <p className="text-muted-foreground">
            Select your date, court, equipment, and coach to complete your booking
          </p>
        </div>
        <BookingWizard />
      </div>
    </Layout>
  );
};

export default BookingPage;
