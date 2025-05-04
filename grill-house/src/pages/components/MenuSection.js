import React from 'react';
import styles from '@/styles/MenuSection.module.css';

const MenuSection = () => {
    const menuColumns = [
        {
            title: "MENU 1",
            items: [
                { name: 'STEAK', description: 'Lorem ipsum dolor sit amet...', price: '10 EU' },
                { name: 'STEAK', description: 'Lorem ipsum dolor sit amet...', price: '10 EU' },
                { name: 'STEAK', description: 'Lorem ipsum dolor sit amet...', price: '10 EU' },
            ]
        },
        {
            title: "MENU 2",
            items: [
                { name: 'STEAK', description: 'Lorem ipsum dolor sit amet...', price: '10 EU' },
                { name: 'STEAK', description: 'Lorem ipsum dolor sit amet...', price: '10 EU' },
                { name: 'STEAK', description: 'Lorem ipsum dolor sit amet...', price: '10 EU' },
            ]
        },
        {
            title: "MENU 3",
            items: [
                { name: 'STEAK', description: 'Lorem ipsum dolor sit amet...', price: '10 EU' },
                { name: 'STEAK', description: 'Lorem ipsum dolor sit amet...', price: '10 EU' },
                { name: 'STEAK', description: 'Lorem ipsum dolor sit amet...', price: '10 EU' },
            ]
        }
    ];

    return (
        <section id="menu" className={styles.menuSection}>
            <div className={styles.menuHeader}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.mainTitle}>EXPLORE OUR MENUS</h1>
                </div>
            </div>

            <div className={styles.menuContainer}>
                <div className={styles.menuGrid}>
                    {menuColumns.map((column, columnIndex) => (
                        <div key={columnIndex} className={styles.menuColumn}>
                            <h2 className={styles.columnTitle}>{column.title}</h2>
                            <div className={styles.menuItems}>
                                {column.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className={styles.menuItem}>
                                        <div className={styles.itemHeader}>
                                            <h3 className={styles.itemName}>{item.name}</h3>
                                            <div className={styles.priceContainer}>
                                                <div className={styles.priceLine}></div>
                                                <span className={styles.itemPrice}>{item.price}</span>
                                            </div>
                                        </div>
                                        <p className={styles.itemDescription}>{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MenuSection;
