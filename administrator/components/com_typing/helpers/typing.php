<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_typing
 *
 * @copyright   Copyright (C) 2005 - 2015 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die('Restricted access');

class TypingHelper extends JHelperContent
{
	public static function addSubmenu($vName)
	{
		JHtmlSidebar::addEntry(
			JText::_('COM_TYPING_LESSONS'),
			'index.php?option=com_typing&view=lessons',
			$vName == 'lessons'
		);
		JHtmlSidebar::addEntry(
			JText::_('JCATEGORIES'),
			'index.php?option=com_categories&extension=com_typing',
			$vName == 'categories'
		);
	}
	
	
	/**	 * Get the actions	 */
	public static function getActions($lessonId = 0)
	{
		$result	= new JObject;
		if (empty($lessonId)) {
			$assetName = 'com_typing';
		}
		else {
			$assetName = 'com_typing.lesson.'.(int) $lessonId;
		}
		$actions = JAccess::getActions('com_typing', 'component');
		foreach ($actions as $action) {
			$result->set($action->name, JFactory::getUser()->authorise($action->name, $assetName));
		}
		return $result;
		
		
		/*
		// Get list of actions
		$result = JHelperContent::getActions('com_typing');

		return $result;
		*/
	}
}