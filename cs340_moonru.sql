-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: Dec 22, 2018 at 09:21 AM
-- Server version: 10.1.22-MariaDB
-- PHP Version: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_moonru`
--

-- --------------------------------------------------------

--
-- Table structure for table `cuisine`
--

CREATE TABLE `cuisine` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cuisine`
--

INSERT INTO `cuisine` (`id`, `name`) VALUES
(1, 'Korean'),
(2, 'casual'),
(3, 'fine dining'),
(4, 'New American'),
(5, 'Italian'),
(6, 'fast food'),
(7, 'French'),
(8, 'Peruvian'),
(9, 'Mexican'),
(10, 'Chinese'),
(11, 'Japanese'),
(18, 'British'),
(19, 'Ramon Noodles'),
(20, 'Cajun');

-- --------------------------------------------------------

--
-- Table structure for table `diagnostic`
--

CREATE TABLE `diagnostic` (
  `id` int(11) NOT NULL,
  `text` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `diagnostic`
--

INSERT INTO `diagnostic` (`id`, `text`) VALUES
(1, 'MySQL is Working!');

-- --------------------------------------------------------

--
-- Table structure for table `menu_item`
--

CREATE TABLE `menu_item` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `restaurant_id` int(11) NOT NULL,
  `price` decimal(5,2) DEFAULT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `menu_item`
--

INSERT INTO `menu_item` (`id`, `name`, `restaurant_id`, `price`, `description`) VALUES
(1, 'Charcuterie Board', 1, '30.00', 'Rotating selection of meats, cheeses and pickled vegetables'),
(2, 'Pot Bee-Bim Bop (Beef)', 2, '15.85', 'Rice, vegetables and beef in a hot stone bowl with a fried egg on top'),
(3, 'Boneless Wings (5 count)', 3, '6.50', 'Tender, lightly breaded chicken strips. Served with your choice of sauce and ranch or blue cheese.'),
(4, 'Flourless Chocolate Cake', 1, '8.00', 'Chocolate ganache with raspberry compote'),
(5, 'Good meal', 5, '10.00', 'This is placeholder text'),
(7, 'street corn', 5, '5.00', 'Corn, mayo, cilantro, chili, lime'),
(17, 'Noodles', 24, '1.50', 'Cup O Noodles with hot water available upon request.'),
(19, 'Cheap chili', 10, '1.12', 'At least it has beans!');

-- --------------------------------------------------------

--
-- Table structure for table `menu_item_review`
--

CREATE TABLE `menu_item_review` (
  `id` int(11) NOT NULL,
  `menu_item_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `review` text NOT NULL,
  `visit_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `menu_item_review`
--

INSERT INTO `menu_item_review` (`id`, `menu_item_id`, `user_id`, `review`, `visit_id`) VALUES
(1, 1, 2, 'I thought the Charcuterie Board was good but not great.', NULL),
(2, 2, 2, 'The Bee-Bim Bop was sublime.', 2),
(3, 2, 4, 'meh', NULL),
(4, 4, 2, 'The chocolate cake was fantastic!', 1),
(8, NULL, 1, 'All I can say is...NOPE!', NULL),
(9, NULL, NULL, 'not a real review', NULL),
(10, NULL, NULL, 'it\'s a little dry', NULL),
(12, NULL, 4, 'Enter your review here', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `restaurant`
--

CREATE TABLE `restaurant` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `street_address` varchar(255) DEFAULT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zip` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `restaurant`
--

INSERT INTO `restaurant` (`id`, `name`, `street_address`, `city`, `state`, `zip`) VALUES
(1, 'Rain North West', '1180 City View ST', 'Eugene', 'OR', 86752),
(2, 'Noodle Bowl', '860 Pearl ST', 'Eugene', 'OR', 97401),
(3, 'Toxic Wings', '2766 W 11th Ave', 'Houston', 'TX', 97402),
(4, 'Novo Latin Table', '105 Oakway Center', 'Eugene', 'OR', 97401),
(5, 'Super Good Food', '234 Street Street', 'American City', 'AL', 99995),
(6, 'Double R Diner', '123 Main', 'Twin Peaks', 'OR', 97401),
(10, 'Cheap As Free', '1234 Main St', 'Anytown', 'USA', 12345),
(24, 'Noodles and Tires', '737 Oldtown Rd', 'Newtown', 'AL', 51234),
(25, 'Sumo Dog', '1325 3rd Ave', 'Santa Monica', 'CA', 90401),
(27, 'Black Wolf Supper Club', '454 Willamette ST', 'Eugene', 'OR', 97401),
(104, 'One', '111 One St', 'Onesville', 'Or', 11112);

-- --------------------------------------------------------

--
-- Table structure for table `restaurant_cuisine`
--

CREATE TABLE `restaurant_cuisine` (
  `cuisine_id` int(11) NOT NULL DEFAULT '0',
  `restaurant_id` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `restaurant_cuisine`
--

INSERT INTO `restaurant_cuisine` (`cuisine_id`, `restaurant_id`) VALUES
(1, 2),
(2, 1),
(2, 2),
(2, 3),
(4, 1),
(6, 3),
(8, 4),
(9, 4),
(11, 25),
(19, 24),
(20, 27);

-- --------------------------------------------------------

--
-- Table structure for table `restaurant_review`
--

CREATE TABLE `restaurant_review` (
  `id` int(11) NOT NULL,
  `restaurant_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `review` text NOT NULL,
  `visit_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `restaurant_review`
--

INSERT INTO `restaurant_review` (`id`, `restaurant_id`, `user_id`, `review`, `visit_id`) VALUES
(1, 1, 1, 'I loved everything about Rain NW, especially the service.', 1),
(2, 2, 2, 'Noodle Bowl is one of my favorite restaurants in Eugene.', NULL),
(5, 3, 1, 'ZOMG! This place is amazing!', 3),
(20, 2, 4, 'meh', 2),
(26, 5, 4, 'Food was super good', 4),
(27, 5, 4, 'wow', 4),
(29, 10, 6, 'Ten thumbs up!!!!!!11111 I went in, ordered the \'free money\' and they literally gave me $99.99. Best experience I have ever had in a restaurant. Will be back soon!!!!!11111 lolololol!!!11111', NULL),
(36, 6, 1, 'Diane, that was damn good coffee and apple pie.', NULL),
(37, 4, 2, 'This is our new favorite restaurant in Eugene!', NULL),
(38, NULL, 4, 'If the 1989 Ford Taurus were a restaurant...', NULL),
(40, 3, 4, 'test review', NULL),
(42, 3, NULL, 'Here\'s my review!', NULL),
(44, NULL, 4, 'test', NULL),
(45, 3, 4, 'fake review', NULL),
(46, NULL, 4, 'tester 3', NULL),
(48, NULL, 17, 'Had the drywall flavored hot pockets. As advertised, the outer layer was unbearably hot while the inside remained frozen through. Afterward I experienced the most horrific diarrhea of my life, at one point it was squirting out my nose. Overall I pooped 17 times on the way home, twice in a toilet. Not the worst experience I\'ve had at a restaurant and you can\'t beat that price.', NULL),
(49, 24, 18, 'My favorite restaurant, hands down. Got a set of new Goodyear tires with a spare for $500 bucks along with my order of noodles. They installed them while I waited for the water to heat up. Best noodles I\'ve had in at least a week.', 18),
(52, NULL, 18, 'Just stopped in for a quick squat-n-squirt. The line for the crapper was pretty long, a lot of people had diarrhea. They were out of toilet paper. 4.5 stars, would poop here again.', NULL),
(53, 25, 19, 'amazing with veggie options', 19),
(55, NULL, 4, 'some review', NULL),
(56, NULL, 4, 'Enter your review here', NULL),
(57, 2, 4, 'more meh', NULL),
(58, NULL, 4, 'Enter your review here', NULL),
(59, 104, 1, 'Great!', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `fname`, `lname`) VALUES
(1, 'Russell', 'Moon'),
(2, 'Karessa', 'Torgerson'),
(3, 'Lexi', 'Moon'),
(4, 'Amanda', 'Blevins'),
(5, 'John', 'Foodie'),
(6, 'first', 'last'),
(8, 'Bob', 'Barker'),
(17, 'Amanda', 'Huggankiss'),
(18, 'Joe \'Trucker\'', 'Bobkins'),
(19, 'NewUser', 'Woot');

-- --------------------------------------------------------

--
-- Table structure for table `user_visit`
--

CREATE TABLE `user_visit` (
  `user_id` int(11) NOT NULL,
  `visit_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_visit`
--

INSERT INTO `user_visit` (`user_id`, `visit_id`) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 2),
(3, 1),
(3, 3),
(4, 2),
(5, 4);

-- --------------------------------------------------------

--
-- Table structure for table `visit`
--

CREATE TABLE `visit` (
  `id` int(11) NOT NULL,
  `restaurant_id` int(11) NOT NULL,
  `visit_date` date NOT NULL,
  `price` decimal(6,2) DEFAULT NULL,
  `meal_type` varchar(9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `visit`
--

INSERT INTO `visit` (`id`, `restaurant_id`, `visit_date`, `price`, `meal_type`) VALUES
(1, 1, '2018-10-05', '76.00', 'dinner'),
(2, 2, '2018-09-27', '32.25', 'lunch'),
(3, 2, '2018-11-07', '12.45', 'lunch'),
(4, 5, '2017-01-02', '30.00', 'breakfast'),
(5, 5, '2018-11-14', '67.00', 'lunch'),
(18, 24, '2018-11-07', '501.50', 'other'),
(19, 25, '2018-11-13', '10.00', 'other');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cuisine`
--
ALTER TABLE `cuisine`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `diagnostic`
--
ALTER TABLE `diagnostic`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu_item`
--
ALTER TABLE `menu_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `menu_item_ibfk_1` (`restaurant_id`);

--
-- Indexes for table `menu_item_review`
--
ALTER TABLE `menu_item_review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `menu_item_review_ibfk_3` (`visit_id`),
  ADD KEY `menu_item_review_ibfk_1` (`menu_item_id`),
  ADD KEY `menu_item_review_ibfk_2` (`user_id`);

--
-- Indexes for table `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `restaurant_cuisine`
--
ALTER TABLE `restaurant_cuisine`
  ADD PRIMARY KEY (`cuisine_id`,`restaurant_id`),
  ADD KEY `restaurant_cuisine_ibfk_1` (`restaurant_id`);

--
-- Indexes for table `restaurant_review`
--
ALTER TABLE `restaurant_review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `restaurant_review_ibfk_3` (`visit_id`),
  ADD KEY `restaurant_review_ibfk_1` (`restaurant_id`),
  ADD KEY `restaurant_review_ibfk_2` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_visit`
--
ALTER TABLE `user_visit`
  ADD PRIMARY KEY (`user_id`,`visit_id`),
  ADD KEY `user_visit_ibfk_1` (`visit_id`);

--
-- Indexes for table `visit`
--
ALTER TABLE `visit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `visit_ibfk_1` (`restaurant_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cuisine`
--
ALTER TABLE `cuisine`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `diagnostic`
--
ALTER TABLE `diagnostic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `menu_item`
--
ALTER TABLE `menu_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `menu_item_review`
--
ALTER TABLE `menu_item_review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `restaurant`
--
ALTER TABLE `restaurant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT for table `restaurant_review`
--
ALTER TABLE `restaurant_review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `visit`
--
ALTER TABLE `visit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `menu_item`
--
ALTER TABLE `menu_item`
  ADD CONSTRAINT `menu_item_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `menu_item_review`
--
ALTER TABLE `menu_item_review`
  ADD CONSTRAINT `menu_item_review_ibfk_1` FOREIGN KEY (`menu_item_id`) REFERENCES `menu_item` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `menu_item_review_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `menu_item_review_ibfk_3` FOREIGN KEY (`visit_id`) REFERENCES `visit` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `restaurant_cuisine`
--
ALTER TABLE `restaurant_cuisine`
  ADD CONSTRAINT `restaurant_cuisine_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `restaurant_cuisine_ibfk_2` FOREIGN KEY (`cuisine_id`) REFERENCES `cuisine` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `restaurant_review`
--
ALTER TABLE `restaurant_review`
  ADD CONSTRAINT `restaurant_review_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `restaurant_review_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `restaurant_review_ibfk_3` FOREIGN KEY (`visit_id`) REFERENCES `visit` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `user_visit`
--
ALTER TABLE `user_visit`
  ADD CONSTRAINT `user_visit_ibfk_1` FOREIGN KEY (`visit_id`) REFERENCES `visit` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_visit_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `visit`
--
ALTER TABLE `visit`
  ADD CONSTRAINT `visit_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
