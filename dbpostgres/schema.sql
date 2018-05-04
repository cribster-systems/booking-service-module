DROP DATABASE IF EXISTS bookings;
CREATE DATABASE bookings;

CREATE TABLE rooms (
    room_id         INT PRIMARY KEY,
    room_name       VARCHAR,
    world_name      VARCHAR,
    keywords        VARCHAR,
    room_rate       INT,
    guest_number    INT,
    guest_name      VARCHAR,
    host_name       VARCHAR,
    discount        BOOLEAN,
    cleaning_fee    BOOLEAN,
    review_count    INT,
    review_grade    INT
);

CREATE TABLE booked_dates (
    room_id         INT,
    date_booked     DATE,
    FOREIGN KEY (room_id) references rooms(room_id)
);