<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_typing
 *
 * @copyright   Copyright (C) 2005 - 2015 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */
 
// No direct access to this file
defined('_JEXEC') or die('Restricted access');
 
/**
 * HTML View class for the Typing Component
 *
 * @since  0.0.1
 */
class TypingViewTyping extends JViewLegacy
{
	/**
	 * Display the Typing view
	 *
	 * @param   string  $tpl  The name of the template file to parse; automatically searches through the template paths.
	 *
	 * @return  void
	 */
	function display($tpl = null)
	{
		// Check for errors.
		if (count($errors = $this->get('Errors')))
		{
			JLog::add(implode('<br />', $errors), JLog::WARNING, 'jerror');
 
			return false;
		}
		
		$document	= JFactory::getDocument();
		$document->addStyleSheet(JURI::root() . "components/com_typing/views/typing/typing.css");
		$document->addScript("https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js");
		$document->addScript(JURI::root() . "components/com_typing/views/typing/keyboard.js");
		$document->addScript(JURI::root() . "components/com_typing/views/typing/lesson.js");
		$document->addScript(JURI::root() . "components/com_typing/views/typing/statistic.js");
		$document->addScript(JURI::root() . "components/com_typing/views/typing/typing.js");
		
		// Display the view
		parent::display($tpl);
	}
}