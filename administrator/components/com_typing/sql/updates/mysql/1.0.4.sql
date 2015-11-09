
DROP TABLE IF EXISTS `#__typing_lessons`;

CREATE TABLE `#__typing_lessons` (
  `id` int(10) NOT NULL,
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

INSERT INTO `#__typing_lessons` (`id`, `title`, `alias`, `content`, `published`, `catid`, `created`, `created_by`, `created_by_alias`, `modified`, `modified_by`, `checked_out`, `checked_out_time`, `ordering`, `access`, `hits`, `language`, `version`) VALUES
(1, 'first title', '', 'first content unicode ő,Ő,ű,Ű', NULL, NULL, '0000-00-00 00:00:00', 372, '', '0000-00-00 00:00:00', NULL, NULL, '0000-00-00 00:00:00', '0', NULL, NULL, '', '1'),
(2, 'second title', '', 'second content unicode ő,Ő,ű,Ű', NULL, NULL, '0000-00-00 00:00:00', 372, '', '0000-00-00 00:00:00', NULL, NULL, '0000-00-00 00:00:00', '1', NULL, NULL, '', '1');

ALTER TABLE `#__typing_lessons`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `#__typing_lessons`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;