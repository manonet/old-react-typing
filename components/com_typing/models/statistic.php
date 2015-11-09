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
 * Statistic Model
 *
 * @since  0.0.1
 */
class TypingModelStatistic extends JModelItem
{
	/**
	 * Model context string.
	 *
	 * @var        string
	 */
	protected $_context = 'com_typing.statistic';
	
	/**
	 * @var string statistics
	 */
	protected $statistics;
	
	protected function populateState()
	{
		$app = JFactory::getApplication('site');
		$user = JFactory::getUser();
		$user_id = $user->get('id');
		
		$this->setState('statistic.user_id', $user_id);

	}
	
	/**
	 * Method to get a table object, load it if necessary.
	 *
	 * @param   string  $type    The table name. Optional.
	 * @param   string  $prefix  The class prefix. Optional.
	 * @param   array   $config  Configuration array for model. Optional.
	 *
	 * @return  JTable  A JTable object
	 *
	 * @since   1.6
	 */
	public function getTable($type = 'Statistic', $prefix = 'TypingTable', $config = array())
	{
		return JTable::getInstance($type, $prefix, $config);
	}
 
	/**
	 * Get the statistic
	 *
	 * @param   integer  $user_id  Statistic user_id
	 *
	 * @return  string        Fetched String from Table for relevant user_id
	 */
	public function getItem($user_id = null)
	{
		// Request the selected user_id
		$user_id = (!empty($user_id)) ? $user_id : (int) $this->getState('statistic.user_id');
		
		if ($this->_item === null)
		{
			$this->_item = array();
		}
		
		if (!isset($this->_item[$user_id]))
		{
			try
			{	 
				// Get a TableStatistics instance
				// The model now asks the TableStatistic to get the statistic. This table class has to be defined in admin/tables/statistic.php file 
				$table = $this->getTable();
	 
				// Load the statistic
				$table->load($user_id);
	 
				// Assign the statistic
				$this->_item[$user_id] = $table;
			}
			catch (Exception $e)
			{
				if ($e->getCode() == 404)
				{
					// Need to go thru the error handler to allow Redirect to work.
					JError::raiseError(404, $e->getMessage());
				}
				else
				{
					$this->setError($e);
					$this->_item[$user_id] = false;
				}
			}
		}

		return $this->_item[$user_id];
	}
}