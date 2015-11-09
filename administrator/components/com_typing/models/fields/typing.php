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
 
JFormHelper::loadFieldClass('list');

class JFormFieldLessons extends JFormFieldList
{

	protected $type = 'Lessons';

	protected function getOptions()
	{
		$options  = array();
		
		$db    = JFactory::getDBO();
		$query = $db->getQuery(true);
		
		$query->select('id,title,content,catid,access,created,language,hits');
		$query->from('#__typing_lessons AS l');
		$query->leftJoin('#__categories on catid=#__categories.id');
		
		$db->setQuery((string) $query);
		
		$options = $db->loadObjectList();
 
		// Check for a database error.
		if ($db->getErrorNum()) {
			JError::raiseWarning(500, $db->getErrorMsg());
		}
		
		return $options;
	}
}