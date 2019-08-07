-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3307
-- Время создания: Июн 12 2019 г., 00:25
-- Версия сервера: 10.3.13-MariaDB
-- Версия PHP: 7.1.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `ad_db`
--

-- --------------------------------------------------------

--
-- Структура таблицы `access_levels`
--

CREATE TABLE `access_levels` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `access_levels`
--

INSERT INTO `access_levels` (`id`, `name`) VALUES
(1, 'Администратор'),
(2, 'Модератор'),
(3, 'Пользователь');

-- --------------------------------------------------------

--
-- Структура таблицы `banlist`
--

CREATE TABLE `banlist` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `message` varchar(254) NOT NULL,
  `date_end` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `parent_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`id`, `title`, `parent_id`) VALUES
(1, 'Телефоны. Смартфоны', NULL),
(2, 'Мобильные телефоны', 1),
(3, 'Мобильные телефоны: аксессуары и запчасти', 1),
(4, 'Ноутбуки. Компьютеры. Apple. Оргтехника', NULL),
(5, 'Ноутбуки', 4),
(6, 'Планшеты и электронные книги', 4),
(14, 'Авто. Мото', NULL),
(15, 'Легковые автомобили', 14),
(16, 'Грузовые автомобили и прицепы', 14);

-- --------------------------------------------------------

--
-- Структура таблицы `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `comments`
--

INSERT INTO `comments` (`id`, `user_id`, `post_id`, `date`, `message`) VALUES
(1, 1, 1, '2019-06-11 18:10:45', 'Класс'),
(2, 5, 1, '2019-06-11 21:55:11', 'Лучший телефон всех столетий'),
(3, 1, 1, '2019-06-11 23:27:34', 'Вау, новый nokia 3310\r\n'),
(4, 1, 5, '2019-06-11 23:29:40', 'Круто');

-- --------------------------------------------------------

--
-- Структура таблицы `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `cat_id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL,
  `description` text NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `action` varchar(10) NOT NULL,
  `cost` float DEFAULT NULL,
  `photo` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `posts`
--

INSERT INTO `posts` (`id`, `cat_id`, `title`, `user_id`, `description`, `date`, `action`, `cost`, `photo`) VALUES
(1, 2, 'Nokia 3310', 1, 'Просто пушка,а не телефон', '2019-05-23 00:00:00', 'купить', 50, NULL),
(2, 2, 'Iphone 7', 1, 'Что ты видел лучше чем этот телефон. Отдаю даром', '2019-05-23 00:00:00', 'продать', 85, NULL),
(3, 3, 'Xiaomi mi 6', 1, 'sdsdfsda', '2019-06-09 21:39:44', 'продам', 123, NULL),
(4, 2, 'Sony 524', 1, 'Новый телефон привезенный из USA', '2019-06-09 21:40:48', 'продам', 567, NULL),
(5, 5, 'Apple macbook 2018 года', 1, 'Новый ноутбук', '2019-06-09 21:48:11', 'продам', 1200, NULL),
(6, 2, 'Iphone 8 32 гб', 1, 'asdas', '2019-06-09 22:20:16', 'продам', 123, NULL),
(7, 6, 'Ipad 2018', 1, 'Продаю по ненадобности', '2019-06-09 22:21:14', 'продам', 120, NULL),
(8, 2, 'Xiaomi mi 8', 1, 'Не бит, не крашен', '2019-06-09 22:23:02', 'продам', 453, NULL),
(9, 5, 'Lenovo z510', 1, 'Ноутбук с 2013 года. Один владелец', '2019-06-09 22:23:43', 'продам', 400, NULL),
(10, 2, 'Nokia 5820', 1, 'Новый', '2019-06-09 22:30:18', 'продам', 23, NULL),
(11, 5, 'Xiaomi Air', 1, 'Привезен из Америки в пленке', '2019-06-09 22:32:52', 'продам', 2400, NULL),
(12, 3, 'Iphone 4 на запчасти', 1, 'продам Iphone 4 на запчасти', '2019-06-09 22:33:37', 'продам', 100, NULL),
(13, 2, 'Илона', 1, 'Не бита не крашена', '2019-06-11 16:50:57', 'продам', 10000, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `profiles`
--

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `photo` varchar(30) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `dateOfRegistration` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `profiles`
--

INSERT INTO `profiles` (`id`, `first_name`, `last_name`, `photo`, `birthday`, `dateOfRegistration`) VALUES
(1, 'Oleg', 'Okrul', NULL, '1997-10-07', '2019-05-23'),
(21, 'dasd', 'asdas', NULL, '2019-06-20', '2019-06-03'),
(22, 'kek', 'kekun', NULL, '2019-06-20', '2019-06-03'),
(23, 'Игорь', 'Горькин', NULL, '1958-10-12', '2019-06-03');

-- --------------------------------------------------------

--
-- Структура таблицы `setting`
--

CREATE TABLE `setting` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `value` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `profile_id` int(11) NOT NULL,
  `access_id` int(11) NOT NULL DEFAULT 3
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `profile_id`, `access_id`) VALUES
(1, 'olegarxs', '6812387', 'oleg@dasd.fd', 1, 1),
(4, 'baroxak1', '123', 'olegarxs@spaces.ru', 21, 3),
(5, 'baroxak', '123', 'ole@mail.ri', 22, 3),
(6, 'oleg', '123', 'kek@mem.by', 23, 3);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `access_levels`
--
ALTER TABLE `access_levels`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `banlist`
--
ALTER TABLE `banlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Индексы таблицы `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cat_id` (`cat_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `setting`
--
ALTER TABLE `setting`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `profile_id` (`profile_id`),
  ADD KEY `access_id` (`access_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `access_levels`
--
ALTER TABLE `access_levels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `banlist`
--
ALTER TABLE `banlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT для таблицы `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT для таблицы `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT для таблицы `setting`
--
ALTER TABLE `setting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `banlist`
--
ALTER TABLE `banlist`
  ADD CONSTRAINT `banlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`);

--
-- Ограничения внешнего ключа таблицы `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`cat_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`profile_id`) REFERENCES `profiles` (`id`),
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`access_id`) REFERENCES `access_levels` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
