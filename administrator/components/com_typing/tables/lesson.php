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
 * Lesson Table class
 *
 * @since  0.0.1
 */
class TypingTableLesson extends JTable
{
	/**
	 * Constructor
	 *
	 * @param   JDatabaseDriver  &$db  A database connector object
	 */
	function __construct(&$db)
	{
		parent::__construct('#__typing_lessons', 'id', $db);
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

		if ($this->id)
		{
			// Existing item
			$this->modified_by	= $user->get('id');
		}
		else
		{
			// New lesson. A lesson created and created_by field can be set by the user,
			// so we don't touch either of these if they are set.
			if (!(int) $this->created)
			{
				$this->created = $date->toSql();
			}

			if (empty($this->created_by))
			{
				$this->created_by = $user->get('id');
			}
		}

		// Verify that the alias is unique
		$table = JTable::getInstance('Lesson', 'TypingTable');

		if ($table->load(array('alias' => $this->alias, 'catid' => $this->catid)) && ($table->id != $this->id || $this->id == 0))
		{
			$this->setError(JText::_('COM_TYPING_ERROR_UNIQUE_ALIAS'));

			return false;
		}

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
		/** check for valid title */
		if (trim($this->title) == '')
		{
			$this->setError(JText::_('COM_TYPING_WARNING_PROVIDE_VALID_TITLE'));

			return false;
		}
		
		/** check for valid content */
		if (trim($this->content) == '')
		{
			$this->setError(JText::_('COM_TYPING_WARNING_PROVIDE_VALID_CONTENT'));

			return false;
		}

		// Generate a valid alias
		$this->generateAlias();

		/** check for valid category */
		if (trim($this->catid) == '')
		{
			$this->setError(JText::_('COM_TYPING_WARNING_CATEGORY'));

			return false;
		}

		return true;
	}

	/**
	 * Generate a valid alias from title / date.
	 * Remains public to be able to check for duplicated alias before saving
	 *
	 * @return  string
	 */
	public function generateAlias()
	{
		if (empty($this->alias))
		{
			$this->alias = $this->title;
		}

		$this->alias = JApplication::stringURLSafe($this->alias);

		if (trim(str_replace('-', '', $this->alias)) == '')
		{
			$this->alias = JFactory::getDate()->format("Y-m-d-H-i-s");
		}

		return $this->alias;
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
	
	/**
	* Method to compute the default name of the asset.
	* The default name is in the form `table_name.id`
	* where id is the value of the primary key of the table.
	*
	* @return	string
	* @since	2.5
	*/
	protected function _getAssetName()
	{
		$k = $this->_tbl_key;
		return 'com_typing.lesson.'.(int) $this->$k;
	}
	
	/**
	* Method to return the title to use for the asset table.
	*
	* @return	string
	* @since	2.5
	*/
	protected function _getAssetTitle()
	{
		return $this->greeting;
	}
	
	/**
	* Method to get the asset-parent-id of the item	 *
	* @return	int
	*/
	protected function _getAssetParentId(JTable $table = NULL, $id = NULL)
	{
		// We will retrieve the parent-asset from the Asset-table
		$assetParent = JTable::getInstance('Asset');
		
		// Default: if no asset-parent can be found we take the global asset
		$assetParentId = $assetParent->getRootId();
		
		// Find the parent-asset
		if (($this->catid)&& !empty($this->catid))
		{
			// The item has a category as asset-parent
			$assetParent->loadByName('com_typing.category.' . (int) $this->catid);
		}
		else {
			// The item has the component as asset-parent
			$assetParent->loadByName('com_typing');
		}
		
		// Return the found asset-parent-id
		if ($assetParent->id)
		{
			$assetParentId=$assetParent->id;
		}
		return $assetParentId;
	}
}