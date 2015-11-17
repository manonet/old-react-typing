
DROP TABLE IF EXISTS `#__typing_lessons`;

CREATE TABLE `#__typing_lessons` (
  `id` int(10) NOT NULL,
  `asset_id` int(10) NOT NULL DEFAULT '0',
  `title` varchar(255) NOT NULL,
  `alias` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `content` mediumtext NOT NULL,
  `published` tinyint(3) DEFAULT NULL,
  `catid` int(10) unsigned DEFAULT NULL,
  `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `created_by` int(10) unsigned NOT NULL,
  `created_by_alias` varchar(255) NOT NULL,
  `modified` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `modified_by` int(10) unsigned DEFAULT NULL,
  `checked_out` int(10) unsigned DEFAULT NULL,
  `checked_out_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ordering` int(11) NOT NULL DEFAULT '0',
  `access` int(10) unsigned DEFAULT NULL,
  `hits` int(10) unsigned DEFAULT NULL,
  `language` char(7) NOT NULL,
  `version` int(10) unsigned NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `#__typing_lessons` (`id`, `asset_id`, `title`, `alias`, `content`, `published`, `catid`, `created`, `created_by`, `created_by_alias`, `modified`, `modified_by`, `checked_out`, `checked_out_time`, `ordering`, `access`, `hits`, `language`, `version`) VALUES
(1, 54, 'first title', '', 'first content unicode ő,Ő,ű,Ű', NULL, NULL, '0000-00-00 00:00:00', 372, '', '0000-00-00 00:00:00', NULL, NULL, '0000-00-00 00:00:00', '0', NULL, NULL, '', '1'),
(2, 54, 'second title', '', 'second content unicode ő,Ő,ű,Ű', NULL, NULL, '0000-00-00 00:00:00', 372, '', '0000-00-00 00:00:00', NULL, NULL, '0000-00-00 00:00:00', '1', NULL, NULL, '', '1');

ALTER TABLE `#__typing_lessons`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `#__typing_lessons`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;



--
-- Table structure for table `mano_typing_statistic`
--

DROP TABLE IF EXISTS `#__typing_statistics`;

CREATE TABLE IF NOT EXISTS `#__typing_statistics` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created` date NOT NULL DEFAULT '0000-00-00',
  `updated` date NOT NULL DEFAULT '0000-00-00',
  `correct_hits` int(10) NOT NULL,
  `miswrite_hits` int(10) NOT NULL,
  `endurance` int(10) NOT NULL,
  `accuracy` decimal(8,4) NOT NULL,
  `speed` decimal(10,4) NOT NULL,
  `details` varchar(100) NOT NULL DEFAULT '[]'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `#__typing_statistics`
  ADD PRIMARY KEY (`id`);
  ADD UNIQUE KEY `created_by` (`user_id`);
  
ALTER TABLE `#__typing_statistics`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;