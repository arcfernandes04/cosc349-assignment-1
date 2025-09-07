CREATE TABLE IF NOT EXISTS warehouse(
    warehouse_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS item(
    item_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(200),
    rental_price DECIMAL(10,2),
    quantity INT,
    supplier_id INT,
    warehouse_id INT,

    FOREIGN KEY (warehouse_id) REFERENCES warehouse(warehouse_id)
);

-- Warehouses
INSERT INTO warehouse (warehouse_id, name, location) VALUES
(1, 'Dunedin', '1 George St, Otago'),
(2, 'Palmerston North', '2 Tennent Dr'),
(3, 'Nelson', '3 Waimea');

-- Items
INSERT INTO item (item_id, name, description, rental_price, quantity, warehouse_id) VALUES
(1, 'MaestroDMX Lighting Controller', 'Autonomous control of colour, dimmers, movement, and effect changes based on the music.', 50, 5, 1),
(2, 'ChamSys MagicQ MQ50', 'MagicQ MQ50 is part of the new generation of compact consoles, ideal for small to medium sized venues', 350, 1, 2),
(3, 'CHAUVET Maverick Force 2 Profile', 'Maverick Force 2 Profile is a lightweight, tour-grade moving head with a big presence.', 150, 8, 1),
(4, 'CHAUVET Ovation CYC3FC', 'Ovation CYC 3 FC goes to new lengths to deliver a homogeneous field of light with significant reach.', 150, 6, 3);
