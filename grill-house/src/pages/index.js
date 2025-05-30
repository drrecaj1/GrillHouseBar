import Header from './components/Header';
import HeroSection from './components/HeroSection';
import RestaurantInfoSection from './components/RestaurantInfoSection';
import MenuSection from './components/MenuSection';
import ReservationForm from './components/ReservationForm';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import ContactForm from './components/ContactForm';

export default function Home() {
    return (
        <div className="container scrollSnapContainer">
            <Header />
            <HeroSection />
            <RestaurantInfoSection />
            <MenuSection />
            <ReservationForm />
            <Gallery />
            <ContactSection />
            <ContactForm />
            <Footer />
        </div>
    );
}
