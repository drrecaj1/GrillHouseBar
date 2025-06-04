import styles from '@/styles/Gallery.module.css';

const imagesTop = [
    "/media/photo1.jpg",
    "/media/photo10.jpg",
    "/media/photo3.jpg",
    "/media/photo12.jpg"
];

const imagesBottom = [
    "/media/photo5.jpg",
    "/media/photo6.jpg",
    "/media/photo7.jpg",
    "/media/photo8.jpg"
];

export default function Gallery() {
    return (
        <section id="gallery" className={styles.gallerySection}>
            <div className={styles.row}>
                {imagesTop.map((src, idx) => (
                    <img key={idx} src={src} alt={`Top Gallery ${idx + 1}`} className={styles.image} />
                ))}
            </div>

            <div className={styles.overlay}>
                <h2>Our Photo Gallery</h2>
                <p>
                    Discover the essence of Grill House Bar through our curated gallery.
                    Each photo tells a story of flavor, comfort, and unforgettable moments.
                </p>
            </div>

            <div className={styles.row}>
                {imagesBottom.map((src, idx) => (
                    <img key={idx} src={src} alt={`Bottom Gallery ${idx + 1}`} className={styles.image} />
                ))}
            </div>
        </section>
    );
}