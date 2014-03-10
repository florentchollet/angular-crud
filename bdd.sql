CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

CREATE TABLE IF NOT EXISTS `artists` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Sample Data
--

INSERT INTO `users` (`id`, `username`, `first_name`, `last_name`, `email`) VALUES
(1, 'ozzy', 'Ozzy', 'Osbourne', 'ozzy.osbourne@free.fr'),
(2, 'tony', 'Tony', 'Iommi', 'tonyiommi@free.fr');


INSERT INTO `artists` (`id`, `name`) VALUES
(1, 'Black Sabbath');