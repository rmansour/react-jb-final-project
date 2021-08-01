-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 31, 2021 at 05:47 PM
-- Server version: 10.6.3-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jb_final_project_react`
--

-- --------------------------------------------------------

--
-- Table structure for table `favorite_vacations`
--

CREATE TABLE `favorite_vacations` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `vacationId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB;

--
-- Dumping data for table `favorite_vacations`
--

INSERT INTO `favorite_vacations` (`id`, `createdAt`, `updatedAt`, `vacationId`, `userId`) VALUES
(451, '2021-07-31 10:29:01', '2021-07-31 10:29:01', 2, 3),
(452, '2021-07-31 10:29:06', '2021-07-31 10:29:06', 3, 3),
(566, '2021-07-31 15:21:02', '2021-07-31 15:21:02', 1, 6),
(567, '2021-07-31 15:21:09', '2021-07-31 15:21:09', 2, 6);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'user', '2021-07-23 15:49:38', '2021-07-23 15:49:38'),
(2, 'admin', '2021-07-23 15:49:38', '2021-07-23 15:49:38');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(2, 'raed115', 'raied272@gmail.com', '$2a$08$ROXp2LclnQ5nil5fRNeLxewXJPNLnG0rPbQjTFVXbShppOmBEISiW', '2021-07-23 15:50:22', '2021-07-23 15:50:22'),
(3, 'rabeh', 'rabeh@gmail.com', '$2a$08$Pu6Lq1HtlGlY8WsgVWGJMeBFsGU/Q7BLqQ9FwL6lrNFOvIn1et0ci', '2021-07-23 16:37:00', '2021-07-23 16:37:00'),
(4, 'Sezar', 'sezar@gmail.com', '$2a$08$Fho0v3nCroq2s1jAqgOukuiIwdCLd8Bh77xAYjSWowpbe.DQxof1.', '2021-07-25 10:15:09', '2021-07-25 10:15:09'),
(5, 'Roni Milner', 'roni@gmail.com', '$2a$08$19k5LKDGuVdwv7TO52hOX.Ne.EJNBTHdUEVko/xyTqjb3mpg1VwWO', '2021-07-30 20:27:45', '2021-07-30 20:27:45'),
(6, 'Dalal', 'dalal@gmail.com', '$2a$08$OgCom/QQ.IQfrViHQmEGH.FNHRVTRcKCbhzHsNJhF97ZhJRuyv8iu', '2021-07-31 10:09:28', '2021-07-31 10:09:28');

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`createdAt`, `updatedAt`, `roleId`, `userId`) VALUES
('2021-07-23 16:37:00', '2021-07-23 16:37:00', 1, 3),
('2021-07-25 10:15:09', '2021-07-25 10:15:09', 1, 4),
('2021-07-30 20:27:45', '2021-07-30 20:27:45', 1, 5),
('2021-07-31 10:09:28', '2021-07-31 10:09:28', 1, 6),
('2021-07-23 15:50:22', '2021-07-23 15:50:22', 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `id` int(11) NOT NULL,
  `description` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `destination` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `price` float NOT NULL,
  `followers` int(11) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `filename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`id`, `description`, `destination`, `start_date`, `end_date`, `price`, `followers`, `createdAt`, `updatedAt`, `type`, `filename`) VALUES
(1, 'Berlin is the capital city of Germany and one of the 16 states (Länder) of the Federal Republic of Germany. Berlin is the largest city in Germany and has a population of 4.5 million within its metropolitan area and 3.5 million from over 190 countries within the city limits.\nBerlin is best known for its historical associations as the German capital, internationalism and tolerance, lively nightlife, its many cafés, clubs, bars, street art, and numerous museums, palaces, and other sites of historic interest. Berlin\'s architecture is quite varied. Although badly damaged in the final years of World War II and broken apart during the Cold War, Berlin has reconstructed itself greatly, especially with the reunification push after the fall of the Berlin Wall in 1989.\nIt is now possible to see representatives of many different historic periods in a short time within the city centre, from a few surviving medieval buildings near Alexanderplatz, to the ultra modern glass and steel structures at Potsdamer Platz. Because of its tumultuous history, Berlin remains a city with many distinctive neighbourhoods. Brandenburger Tor is a symbol of division during the world war, which now shows German reunification. It was built after the Acropolis in Athens and was completed in 1799 as the royal city-gate.\nGermany was later on divided into east and west, In August 13,1961, East Germans permanently closed the border between East and West. The wall had 45,000 sections of reinforced concrete and included 79 miles of fencing, nearly 300 watchtowers and 250 guard dogs. Still more than 5,000 people escaped to freedom.', 'Berlin, Germany', '2021-07-23 00:00:00', '2021-07-30 00:00:00', 700, 82, '2021-07-16 20:23:15', '2021-07-31 15:21:36', 'image/jpeg', '1627685376559-berlin-school-hero-1.jpg'),
(2, 'The gorgeous Tel Aviv beaches, the incredible Tel Aviv restaurants, the energetic Tel Aviv nightlife, the mesmerizing museums, great shopping, breathtaking landscapes — all of these attributes make Tel Aviv so great. But, there\'s so much more. Don’t let yourself get swept up by the coastline’s sea, sun and hummus (we know it’s a challenge!) because you’d be mad not to visit the city’s other top attractions. To help you get organized, we’ve rounded up the best things to do in Tel Aviv so you can make the most of your visit.', 'Tel Aviv', '2021-07-16 22:41:32', '2021-07-31 22:41:35', 1200, 66, '2021-07-16 22:41:47', '2021-07-31 15:21:09', 'image/jpeg', '1627732624819-Tel_Aviv_Adobe.jpg'),
(3, 'Amsterdam is the Netherlands’ capital, known for its artistic heritage, elaborate canal system and narrow houses with gabled facades, legacies of the city’s 17th-century Golden Age. Its Museum District houses the Van Gogh Museum, works by Rembrandt and Vermeer at the Rijksmuseum, and modern art at the Stedelijk. Cycling is key to the city’s character, and there are numerous bike paths.', 'Amsterdam, Netherlands', '2021-07-30 00:00:00', '2021-08-07 00:00:00', 123, 60, '2021-07-19 18:27:08', '2021-07-31 15:20:55', 'image/jpeg', '1627685454307-19212443_6.jpg'),
(4, 'New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that’s among the world’s major commercial, financial and cultural centers. Its iconic sites include skyscrapers such as the Empire State Building and sprawling Central Park. Broadway theater is staged in neon-lit Times Square. ', 'New York, New York, USA', '2021-09-25 19:12:39', '2021-10-25 19:12:47', 1200, 96, '2021-07-19 19:13:07', '2021-07-31 15:20:54', 'image/jpeg', '1627685463306-iStock_000040849990_Large.jpg'),
(5, 'Beijing, China’s sprawling capital, has history stretching back 3 millennia. Yet it’s known as much for modern architecture as its ancient sites such as the grand Forbidden City complex, the imperial palace during the Ming and Qing dynasties. Nearby, the ', 'Beijing,China', '2021-07-27 19:14:49', '2021-08-19 19:14:56', 1699, 102, '2021-07-19 19:15:16', '2021-07-31 15:12:57', 'image/jpeg', '1627685480819-local-office-images-beijing-1440x810.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `favorite_vacations`
--
ALTER TABLE `favorite_vacations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `favorite_vacations_user_id_vacation_id` (`userId`,`vacationId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`roleId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `favorite_vacations`
--
ALTER TABLE `favorite_vacations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=568;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `favorite_vacations`
--
ALTER TABLE `favorite_vacations`
  ADD CONSTRAINT `favorite_vacations_ibfk_25` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `favorite_vacations_ibfk_26` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
