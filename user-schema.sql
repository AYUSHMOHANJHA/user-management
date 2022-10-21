CREATE TABLE `user` (
  `id` int NOT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_col` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `comments` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT 'active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci