-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 15, 2023 at 09:49 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `golden_liberty`
--

-- --------------------------------------------------------

--
-- Table structure for table `condominiums`
--

CREATE TABLE `condominiums` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `main_description` text NOT NULL,
  `main_filename` varchar(255) NOT NULL,
  `main_directory` varchar(255) NOT NULL,
  `thumbnail_description` text NOT NULL,
  `thumbnail_filename` varchar(255) NOT NULL,
  `thumbnail_directory` varchar(255) NOT NULL,
  `amenities_description` text NOT NULL,
  `amenities_list` text NOT NULL,
  `amenities_filename` char(255) NOT NULL,
  `amenities_directory` varchar(255) NOT NULL,
  `location_description` text NOT NULL,
  `location_filename` varchar(255) NOT NULL,
  `location_directory` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `statid` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `condominiums`
--

INSERT INTO `condominiums` (`id`, `name`, `main_description`, `main_filename`, `main_directory`, `thumbnail_description`, `thumbnail_filename`, `thumbnail_directory`, `amenities_description`, `amenities_list`, `amenities_filename`, `amenities_directory`, `location_description`, `location_filename`, `location_directory`, `address`, `statid`) VALUES
(1, 'Aruga Resort and Residences', 'Aruga Resort and Residences – Mactan is Rockwell’s move to beachfront living in Cebu. Sitting on a popular sailing and snorkeling destination, within convenient reach of everything from the Lapu-Lapu shrine to the Mactan-Cebu International Airport, Aruga Resort and Residences – Mactan keeps your vacation open for adventures in and out of the resort and residential area.', '1691769081971-hero1.jpeg', '/uploads/condominium/main/', 'Aruga Resort and Residences – Mactan is Rockwell’', '1691769118672-hero2.jpeg', '/uploads/condominium/thumbnail/', 'On this hill, the child in you awakens.\r\nWhether looking for a space where you can get lost in your reading or wanting to spend a day outside with your family, The Arton caters to your needs. Get access to world-class amenities any time you want.', 'Fitness Gym\r\nFunction Room\r\nSwimming Pools\r\nCo-working Spaces\r\nMulti-Purpose Court\r\n', '1691769173054-Screenshot 2023-08-11 234923.jpg', '/uploads/condominium/amenities/', 'The Arton is a pre-selling residential condominium conveniently located along Aurora Boulevard, Brgy. Loyola Heights, Quezon City. Relish in its space by acquiring a unit for sale that fits your whole family and lifestyle needs. Its proximity to retail establishments and lifestyle hubs provides you an array of lifestyle options within your reach. Best of all, the country’s top universities are only a few minutes away. Imagine how easy it is to take your kids to school and come home to a relaxing community.', '1691769204134-location.jpg', '/uploads/condominium/location/', 'Property Address\r\nThe Arton by Rockwell\r\nAurora Boulevard, Barangay Loyola Heights, Quezon City', 1);

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `directory` varchar(255) NOT NULL,
  `directoryId` int(11) NOT NULL,
  `location` varchar(255) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `statid` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `directory`, `directoryId`, `location`, `filename`, `statid`) VALUES
(1, 'hero', 1, '/uploads/hero/', '1691678912112-hero1.jpeg', 2),
(2, 'hero', 1, '/uploads/hero/', '1691679102588-hero2.jpeg', 2),
(3, 'hero', 1, '/uploads/hero/', '1691679102588-hero3.jpeg', 2),
(4, 'hero', 1, '/uploads/hero/', '1691681665118-hero1.jpeg', 2),
(5, 'hero', 1, '/uploads/hero/', '1691681665118-hero3.jpeg', 2),
(6, 'hero', 1, '/uploads/hero/', '1691681665118-hero2.jpeg', 2),
(7, 'hero', 1, '/uploads/hero/', '1691718924327-hero1.jpeg', 1),
(8, 'hero', 1, '/uploads/hero/', '1691718949177-hero2.jpeg', 2),
(9, 'hero', 1, '/uploads/hero/', '1691718988136-hero3.jpeg', 2),
(10, 'hero', 1, '/uploads/hero/', '1691731347567-hero3.jpeg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `payables`
--

CREATE TABLE `payables` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `statid` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payables`
--

INSERT INTO `payables` (`id`, `name`, `statid`) VALUES
(1, 'Megaworld Corporation', 1);

-- --------------------------------------------------------

--
-- Table structure for table `unit_types`
--

CREATE TABLE `unit_types` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `directory` varchar(255) NOT NULL,
  `directoryId` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `statid` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `unit_types`
--

INSERT INTO `unit_types` (`id`, `name`, `directory`, `directoryId`, `description`, `statid`) VALUES
(1, 'One Bedroom', 'condominiums', 1, 'Discover independence in our one bedroom units. Build your ideal home as a young entrepreneur or a create a viable investment as a budding professional.', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `uname` varchar(255) NOT NULL,
  `pword` varchar(255) NOT NULL,
  `statid` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `uname`, `pword`, `statid`) VALUES
(1, 'admin', 'ffaa624cbd1c62fe090c24386bed19c9', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `condominiums`
--
ALTER TABLE `condominiums`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payables`
--
ALTER TABLE `payables`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `unit_types`
--
ALTER TABLE `unit_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `condominiums`
--
ALTER TABLE `condominiums`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `payables`
--
ALTER TABLE `payables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `unit_types`
--
ALTER TABLE `unit_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
