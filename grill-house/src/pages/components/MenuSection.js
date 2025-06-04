import React, { useState } from 'react';
import styles from '@/styles/MenuSection.module.css';

const menus = [
    {
        title: 'Menu 1 – Garden Grill',
        price: '€23 per person',
        sections: [
            {
                heading: 'Main Dishes',
                items: ['Grilled chicken fillet (150g)', 'Homemade beef meatballs (3 pcs)', 'Pitalka']
            },
            {
                heading: 'Salads & Sides',
                items: ['Shopska salad', 'Carrot salad with garlic and parsley', 'Chilled potato salad with red onions']
            },
            {
                heading: 'Traditional Dish',
                items: ['Homemade spinach pie']
            },
            {
                heading: 'Drinks (Unlimited)',
                items: ['Still/sparkling water', 'Fruit juices', 'Soft drinks', 'One alcoholic drink: Peja draft or house white wine']
            }
        ]
    },
    {
        title: 'Menu 2 – Balkan Feast',
        price: '€28 per person',
        sections: [
            {
                heading: 'Main Dishes',
                items: ['Grilled pleskavica (100g)', 'Homemade sausages (2 pcs)', 'Pitalka']
            },
            {
                heading: 'Salads & Sides',
                items: ['Spicy house-made "Lang"', 'Creamy vegetarian pasta salad', 'Refreshing cabbage salad']
            },
            {
                heading: 'Traditional Dishes',
                items: ['Fli', 'Mantia']
            },
            {
                heading: 'Drinks (Unlimited)',
                items: ['Still/sparkling water', 'Juices', 'Soft drinks', 'Unlimited wine', 'Peja draft beer', 'Raki rrushi']
            }
        ]
    },
    {
        title: 'Menu 3 – Premium',
        price: '€35 per person',
        sections: [
            {
                heading: 'Main Dishes',
                items: ['Grilled chicken fillet', 'Pleskavica and sausages combo', 'Pitalka bread', 'Optional extra: meatballs or vegetarian alternative']
            },
            {
                heading: 'Salads & Sides',
                items: ['Shopska salad', 'Cabbage salad', 'Carrot salad', 'Pasta salad', 'Cold potato salad']
            },
            {
                heading: 'Traditional Dishes',
                items: ['Fli', 'Mantia', 'Spinach pie', 'Leqenik (if available)']
            },
            {
                heading: 'Drinks (Unlimited)',
                items: ['Peja draft', 'Wine', 'Raki rrushi', 'Soft drinks']
            }
        ]
    }
];

export default function MenuSection() {
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent((current - 1 + menus.length) % menus.length);
    const next = () => setCurrent((current + 1) % menus.length);

    const getCardPosition = (index) => {
        const diff = (index - current + menus.length) % menus.length;


        if (diff === 0) return 'center';
        if (diff === 1) return 'right';
        if (diff === 2) return 'left';
        return 'hidden';
    };

    return (
        <section id="menu" className={styles.menuSection}>
            <div className={styles.menuHeader}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.mainTitle}>Our Special Set Menus</h1>
                </div>
            </div>

            <div className={styles.carouselContainer}>
                <div className={styles.carouselInner}>
                    {menus.map((menu, index) => {
                        const position = getCardPosition(index);

                        return (
                            <div
                                key={index}
                                className={`${styles.menuCard} ${styles[position]}`}
                                onClick={position !== 'center' ? (position === 'right' ? next : prev) : undefined}
                            >
                                <h2 className={styles.menuTitle}>{menu.title}</h2>
                                <p className={styles.menuPrice}>{menu.price}</p>
                                <div className={styles.menuSectionsGrid}>
                                    {menu.sections.map((section, i) => (
                                        <div key={i} className={styles.menuSectionBlock}>
                                            <h3 className={styles.sectionHeading}>{section.heading}</h3>
                                            <ul className={styles.menuItemsList}>
                                                {section.items.map((item, j) => (
                                                    <li key={j} className={styles.menuItem}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className={styles.carouselControls}>
                <button onClick={prev} className={styles.navButton}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Last
                </button>
                <button onClick={next} className={styles.navButton}>
                    Next
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </section>
    );
}