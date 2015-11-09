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
class TypingViewLesson extends JViewLegacy
{
	protected $item = null;
	
	/**
	 * Display the Lesson view
	 *
	 * @param   string  $tpl  The name of the template file to parse; automatically searches through the template paths.
	 *
	 * @return  void
	 */
	function display($tpl = null)
	{		
		// Assign data to the view
		$this->item  = $this->get('Item');
 
		// Check for errors.
		if (count($errors = $this->get('Errors')))
		{
			JLog::add(implode('<br />', $errors), JLog::WARNING, 'jerror');
 
			return false;
		}
		
		// Display the view
		$data = array($this->item);
		 
		// Get the document object.
		$document =& JFactory::getDocument();
		 
		// Set the MIME type for JSON output.
		$document->setMimeEncoding('application/json');
		 
		// Change the suggested filename.
		JResponse::setHeader('Content-Disposition','attachment;filename="bla.json"');
		 
		// Output the JSON data.
		echo json_encode($data);
	}
	

	
}