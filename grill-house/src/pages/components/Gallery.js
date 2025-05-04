import { useState, useEffect } from 'react';
import styles from '@/styles/Gallery.module.css';

export default function Gallery() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const images = [
        { src: "/media/photo1.jpg", alt: "Gallery Image 1" },
        { src: "/media/photo3.jpg", alt: "Gallery Image 2" },
        { src: "/media/photo9.jpg", alt: "Gallery Image 3" },
        { src: "/media/photo10.jpg", alt: "Gallery Image 4" },
        { src: "/media/photo7.jpg", alt: "Gallery Image 5" }
    ];

    const nextSlide = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
        }
    };

    const prevSlide = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
        }
    };

    const goToSlide = (index) => {
        if (!isTransitioning && index !== activeIndex) {
            setIsTransitioning(true);
            setActiveIndex(index);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTransitioning(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [activeIndex]);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, [activeIndex]);

    return (
        <section id="gallery" className={styles.fullGallery}>
            <div className={styles.galleryContainer}>
                <h1 className={styles.galleryTitle}>Photo Gallery</h1>

                <div className={styles.carouselWrapper}>
                    <div className={styles.carouselContainer}>
                        <div className={styles.carousel}>
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className={`${styles.slide} ${index === activeIndex ? styles.activeSlide : ''}`}
                                >
                                    <div className={styles.slideInner}>
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className={styles.slideImage}
                                        />
                                        <div className={styles.caption}>
                                            <p>{image.caption}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.indicators}>
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`${styles.indicator} ${index === activeIndex ? styles.activeIndicator : ''}`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Navigation buttons placed outside of carouselContainer */}
                    <button
                        onClick={prevSlide}
                        className={`${styles.navButton} ${styles.prevButton}`}
                        disabled={isTransitioning}
                        aria-label="Previous slide"
                    >
                        &lt;
                    </button>
                    <button
                        onClick={nextSlide}
                        className={`${styles.navButton} ${styles.nextButton}`}
                        disabled={isTransitioning}
                        aria-label="Next slide"
                    >
                        &gt;
                    </button>
                </div>

                <div className={styles.thumbnailsContainer}>
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`${styles.thumbnail} ${index === activeIndex ? styles.activeThumbnail : ''}`}
                        >
                            <img
                                src={image.src}
                                alt={`Thumbnail ${index + 1}`}
                                className={styles.thumbnailImage}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
