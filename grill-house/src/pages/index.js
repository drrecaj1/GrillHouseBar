// pages/index.js
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MenuSection from './components/MenuSection';
import ReservationForm from './components/ReservationForm';
import ContactSection from './components/ContactSection';

export default function Home() {
    return (
        <div className="container">
            <Header />
            <HeroSection />
            <MenuSection />
            <ReservationForm />
            <ContactSection />
        </div>
    );
}
