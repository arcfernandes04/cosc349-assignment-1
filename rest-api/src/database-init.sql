-- Replace rms with your database name
use rms;

drop table if exists item;

CREATE TABLE IF NOT EXISTS item(
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    item_description VARCHAR(200),
    item_rental_price DECIMAL(10,2),
    item_quantity INT
);

-- Items
INSERT INTO item (item_id, item_name, item_description, item_rental_price, item_quantity) VALUES
(1, 'MaestroDMX Lighting Controller', 'Autonomous control of colour, dimmers, movement, and effect changes based on the music.', 50, 5),
(2, 'ChamSys MagicQ MQ50', 'MagicQ MQ50 is part of the new generation of compact consoles, ideal for small to medium sized venues', 350, 1),
(3, 'CHAUVET Maverick Force 2 Profile', 'Maverick Force 2 Profile is a lightweight, tour-grade moving head with a big presence.', 150, 8),
(4, 'CHAUVET Ovation CYC3FC', 'Ovation CYC 3 FC goes to new lengths to deliver a homogeneous field of light with significant reach.', 150, 6);
