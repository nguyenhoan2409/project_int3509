-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 16, 2024 at 04:49 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `duan`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`) VALUES
(1, 'product'),
(2, 'football_ground'),
(3, 'basketball_yard');

-- --------------------------------------------------------

--
-- Table structure for table `certificate`
--

CREATE TABLE `certificate` (
  `certificate_id` int(11) NOT NULL,
  `mssv` int(11) DEFAULT NULL,
  `fullname` varchar(150) DEFAULT NULL,
  `class` varchar(50) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `history_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `rental_time` datetime DEFAULT NULL,
  `return_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `total_money` int(11) DEFAULT NULL,
  `rental_time` datetime DEFAULT NULL,
  `return_time` datetime DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `physicalscore`
--

CREATE TABLE `physicalscore` (
  `mssv` int(20) NOT NULL,
  `fullname` varchar(150) DEFAULT NULL,
  `class` varchar(50) DEFAULT NULL,
  `univercity` varchar(100) DEFAULT NULL,
  `football_score` float DEFAULT NULL,
  `bedminton_score` float DEFAULT NULL,
  `tabletennis_score` float DEFAULT NULL,
  `basketball_score` float DEFAULT NULL,
  `air_volleyball_score` float DEFAULT NULL,
  `volleyball_score` float DEFAULT NULL,
  `taekwondo_score` float DEFAULT NULL,
  `golf_score` float DEFAULT NULL,
  `CDR` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `physicalscore`
--

INSERT INTO `physicalscore` (`mssv`, `fullname`, `class`, `univercity`, `football_score`, `bedminton_score`, `tabletennis_score`, `basketball_score`, `air_volleyball_score`, `volleyball_score`, `taekwondo_score`, `golf_score`, `CDR`) VALUES
(20020058, 'Lê Ngọc Minh', 'QH-2020-I/CQ-C-D', 'UET', 9, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL),
(20020061, 'Phạm Ngọc Minh', 'QH-2020-I/CQ-C-D', 'UET', 7, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL),
(20020071, 'Nguyễn Thanh Tùng', 'QH-2020-I/CQ-C-D', 'UET', 5, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL),
(20020096, 'Nguyễn Thế Anh', 'QH-2020-I/CQ-C-D', 'UET', 4, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL),
(20020110, 'Đinh Nam Khuê', 'QH-2020-I/CQ-C-D', 'UET', 5, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL),
(20020116, 'Nguyễn Tiến Quang', 'QH-2020-I/CQ-C-D', 'UET', 6, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL),
(20020192, 'Nguyễn Văn Dũng', 'QH-2020-I/CQ-C-D', 'UET', 7, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL),
(20020193, 'Bùi Đình Dương', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020194, 'Nguyễn Hải Đăng', 'QH-2020-I/CQ-C-D', 'UET', 9, NULL, 8, 0, NULL, 9, NULL, 6, 1),
(20020211, 'Trịnh Hồng Quân', 'QH-2020-I/CQ-C-D', 'UET', 10, NULL, NULL, 10, NULL, NULL, NULL, NULL, NULL),
(20020235, 'An Trần Công Minh', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020335, 'Kha Văn Thương', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020357, 'Bùi Tuấn Anh', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020359, 'Nguyễn Quang Anh', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020360, 'Nguyễn Vũ Anh', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020363, 'Vũ Huy Anh', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020367, 'Đỗ Văn Bằng', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020371, 'Trương Thành Chung', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020373, 'Dương Văn Công', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020375, 'Nguyễn Tiến Cường', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020377, 'Đoàn Văn Dũng', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020379, 'Hoàng Ngọc Dũng', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020381, 'Nghiêm Quốc Dũng', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020385, 'Nguyễn Đình Duy', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020387, 'Hoàng Minh Dương', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL),
(20020389, 'Nguyễn Quốc Đại', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020391, 'Phùng Tiến Đạt', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020393, 'Đỗ Công Đồng', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020397, 'Nguyễn Văn Hải', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020403, 'Cao Trung Hiếu', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020405, 'Đào Minh Hiếu', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020407, 'Nguyễn Đặng Mạnh Hoàn', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL),
(20020409, 'Lê Huy Hoàng', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020413, 'Vũ Duy Hoàng', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020415, 'Lương Thế Hùng', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020417, 'Đào Quang Huy', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL),
(20020421, 'Đinh Quốc Hưng', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020423, 'Nguyễn Thị Hường', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020425, 'Nguyễn Công Khải', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020427, 'Đặng Trung Kiên', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020430, 'Hoàng Ngọc Lan', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL),
(20020431, 'Nguyễn Thị Hoàng Lan', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL),
(20020433, 'Phạm Thanh Lâm', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020435, 'Nguyễn Văn Linh', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL),
(20020439, 'Nguyễn Tiến Mạnh', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020441, 'Phan Đức Mạnh', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020443, 'Hoàng Gia Minh', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020445, 'Chu Minh Nam', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020447, 'Nguyễn Hải Nam', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020451, 'Nguyễn Đức Nghĩa', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020455, 'Phùng Thị Ngọc', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL),
(20020459, 'Đặng Thị Nhung', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020461, 'Hà Hoàng Phúc', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL),
(20020467, 'Nguyễn Thế Quyết', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020469, 'Nguyễn Đức Sơn', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020473, 'Cao Bá Thắng', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020479, 'Nguyễn Thị Thanh Thủy', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020481, 'Phùng Quốc Toàn', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020483, 'Nguyễn Thị Thu Trang', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020485, 'Phạm Thị Kiều Trang', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020486, 'Phạm Thị Kiều Trang', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020487, 'Trịnh Văn Tráng', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020491, 'Nguyễn Văn Trường', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020493, 'Phạm Anh Tú', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020497, 'Vũ Văn Tuấn', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020501, 'La Trịnh Hoàng Việt', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020503, 'Trần Thành Vinh', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020505, 'Quách Văn Vũ', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL),
(20020507, 'Nguyễn Lương Vững', 'QH-2020-I/CQ-C-D', 'UET', 8, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `product_name` varchar(100) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `category_id`, `product_name`, `price`, `quantity`, `thumbnail`, `description`, `status`) VALUES
(1, 1, 'bóng rổ', 0, 100, '', '', ''),
(2, 1, 'bóng đá', 0, 100, '', '', ''),
(3, 1, 'bóng bàn', 0, 100, '', '', ''),
(4, 1, 'bóng chuyền hơi', 0, 100, '', '', ''),
(5, 1, 'bóng chuyền da', 0, 100, '', '', ''),
(6, 1, 'dây nhảy', 0, 100, '', '', ''),
(7, 2, 'sân bóng đá A', 300000, 1, '', '', 'còn trống'),
(8, 2, 'sân bóng đá B', 300000, 1, '', '', 'còn trống'),
(9, 3, 'sân bóng rổ A', 150000, 1, '', 'Sân được bố trí ngoài trời', 'còn trống'),
(10, 3, 'sân bóng rổ B', 200000, 1, '', 'Sân được bố trí trong nhà đa năng', 'còn trống'),
(11, 1, 'đồng phục VNU', 340000, 10000, '', 'Gồm bộ đồng phục thể chất + Áo khoác đồng phục VNU', 'Nhận đồng phục vào giờ hành chính');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`role_id`, `role_name`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(20) NOT NULL,
  `password` varchar(10) NOT NULL,
  `fullname` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `password`, `fullname`, `email`, `phone_number`, `address`, `role_id`) VALUES
(20020001, 'trangbee', 'Nguyễn Thị Thu Trang', 'trang42a1dqh@gmail.com', '0373311039', 'UET', 1),
(20020002, 'trang', 'Nguyễn Thu Trang', '20020483@gmail.com', '0373311039', 'UET', 2),
(20020014, 'bachtunn', 'Phùng Thị Ngọc', 'ngocphung2662@gmai.com', '0373311039', 'UET', 2),
(20020015, 'hoanne', 'Nguyễn Đặng Mạnh Hoàn', 'ndmhoan@gmai.com', '0373311039', 'UET', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `certificate`
--
ALTER TABLE `certificate`
  ADD PRIMARY KEY (`certificate_id`),
  ADD KEY `mssv` (`mssv`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`history_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `physicalscore`
--
ALTER TABLE `physicalscore`
  ADD PRIMARY KEY (`mssv`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `certificate`
--
ALTER TABLE `certificate`
  MODIFY `certificate_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20020016;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `certificate`
--
ALTER TABLE `certificate`
  ADD CONSTRAINT `certificate_ibfk_1` FOREIGN KEY (`mssv`) REFERENCES `physicalscore` (`mssv`);

--
-- Constraints for table `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `history_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `history_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
