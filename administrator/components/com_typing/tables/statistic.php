<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_typing
 *
 * @copyright   Copyright (C) 2005 - 2015 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */
// No direct access
defined('_JEXEC') or die('Restricted access');
 
/**
 * Statistic Table class
 *
 * @since  0.0.1
 */
class TypingTableStatistic extends JTable
{
	/**
	 * Constructor
	 *
	 * @param   JDatabaseDriver  &$db  A database connector object
	 */
	function __construct(&$db)
	{
		parent::__construct('#__typing_statistics', 'user_id', $db);
	}
	
	public function store($updateNulls = false)
	{
		// Transform the params field
		if (is_array($this->params))
		{
			$registry = new Registry;
			$registry->loadArray($this->params);
			$this->params = (string) $registry;
		}

		$date	= JFactory::getDate();
		$user	= JFactory::getUser();

		$this->modified		= $date->toSql();

		if ($this->user_id)
		{
			// Existing item
		}
		else
		{
			// New statistic.
			$this->created = $date->toSql();
		}
/*
		// Verify that the user is unique and same as current user
		$table = JTable::getInstance('Statistic', 'TypingTable');

		if ($table->user_id != $user->id)
		{
			$this->setError(JText::_('COM_TYPING_ERROR_USER_NOT_MATCH'));

			return false;
		}
*/
		return parent::store($updateNulls);
	}

	/**
	 * Overloaded check function
	 *
	 * @return  boolean  True on success, false on failure
	 *
	 * @see JTable::check
	 * @since 1.5
	 */
	public function check()
	{
		/** check for valid title
		if (trim($this->title) == '')
		{
			$this->setError(JText::_('COM_TYPING_WARNING_PROVIDE_VALID_TITLE'));

			return false;
		}
		 */

		return true;
	}
	
	public function bind($array, $ignore = '')
	{
		if (isset($array['params']) && is_array($array['params']))
		{
			// Convert the params field to a string.
			$parameter = new JRegistry;
			$parameter->loadArray($array['params']);
			$array['params'] = (string)$parameter;
		}
 		// Bind the rules.
		if (isset($array['rules']) && is_array($array['rules']))
		{
			$rules = new JAccessRules($array['rules']);
			$this->setRules($rules);
		}
		return parent::bind($array, $ignore);
	}
}