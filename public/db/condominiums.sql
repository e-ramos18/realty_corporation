-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 07, 2023 at 09:50 AM
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
-- Database: `golden_realty`
--

-- --------------------------------------------------------

--
-- Table structure for table `condominiums`
--

CREATE TABLE `condominiums` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` text NOT NULL,
  `payable_to` int(11) NOT NULL,
  `description` text NOT NULL,
  `statid` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `condominiums`
--

INSERT INTO `condominiums` (`id`, `name`, `location`, `payable_to`, `description`, `statid`) VALUES
(1, 'VION WEST', 'EDSA corner Chino Roces Avenue, Makati City', 1, 'VION WEST has created a vibrant but distinctly laid-back neighborhood at East Bay Residences in Sucat, Muntinlupa. Enjoy wide open spaces and lush landscapes in a peaceful atmosphere without venturing too far from the heart of Metro Manila.', 1),
(2, 'East Bay Residences', 'Sucat, Muntinlupa', 1, 'Rockwell Primaries has created a vibrant but distinctly laid-back neighborhood at East Bay Residences in Sucat, Muntinlupa. Enjoy wide open spaces and lush landscapes in a peaceful atmosphere without venturing too far from the heart of Metro Manila.', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `condominiums`
--
ALTER TABLE `condominiums`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `condominiums`
--
ALTER TABLE `condominiums`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
