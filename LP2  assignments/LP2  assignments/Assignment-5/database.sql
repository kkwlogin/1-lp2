-- Complete Database Setup for Hill Station Event Registration
-- Import this file in phpMyAdmin to set up everything

-- Create Database
CREATE DATABASE IF NOT EXISTS test1;
USE test1;

-- Create Registrations Table
CREATE TABLE IF NOT EXISTS registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL UNIQUE,
  contact VARCHAR(20) NOT NULL UNIQUE,
  event VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for faster lookups
ALTER TABLE registrations ADD INDEX idx_email (email);
ALTER TABLE registrations ADD INDEX idx_contact (contact);

-- Insert sample data (optional - you can delete this)
INSERT INTO registrations (name, email, contact, event) VALUES
('Raj Kumar', 'raj@example.com', '9876543210', 'Manali Trek'),
('Priya Singh', 'priya@example.com', '8765432109', 'Shimla Tour'),
('Amit Patel', 'amit@example.com', '7654321098', 'Nainital Lake');

-- View all registrations
SELECT * FROM registrations;
