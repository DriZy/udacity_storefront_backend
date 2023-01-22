/* Replace with your SQL commands */
CREATE TYPE mood AS ENUM ('active', 'complete', 'pending');

CREATE TABLE orders
(
    id      SERIAL PRIMARY KEY,
    status  mood NOT NULL ,
    user_id bigint REFERENCES users (id)
);