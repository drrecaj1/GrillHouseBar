// pages/index.js
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import RestaurantInfoSection from './components/RestaurantInfoSection';
import MenuSection from './components/MenuSection';
import ReservationForm from './components/ReservationForm';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function Home() {
    return (
        <div className="container">
            <Header />
            <HeroSection />
            <RestaurantInfoSection />
            <MenuSection />
            <ReservationForm />
            <ContactSection />
            <Footer />
        </div>
    );
}
