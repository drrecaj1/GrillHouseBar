// components/MenuSection.js
const MenuSection = () => {
    const menus = [
        { name: 'Steak', description: 'Lorem ipsum dolor sit amet.', price: '10 EU' },
        { name: 'Burger', description: 'Lorem ipsum dolor sit amet.', price: '8 EU' },
        { name: 'Salad', description: 'Lorem ipsum dolor sit amet.', price: '6 EU' },
    ];

    return (
        <section className="menu-section">
            {menus.map((menu, index) => (
                <div key={index} className="menu-item">
                    <h3>{menu.name}</h3>
                    <p>{menu.description}</p>
                    <strong>{menu.price}</strong>
                </div>
            ))}
        </section>
    );
};

export default MenuSection;
