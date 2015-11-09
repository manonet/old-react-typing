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
 * Lesson Model
 *
 * @since  0.0.1
 */
class TypingModelLesson extends JModelItem
{
	/**
	 * Model context string.
	 *
	 * @var        string
	 */
	protected $_context = 'com_typing.lesson';
	
	/**
	 * @var string lessons
	 */
	protected $lessons;
	
	protected function populateState()
	{
		$app = JFactory::getApplication('site');

		// Load state from the request.
		$id = $app->input->getInt('id');
		$this->setState('lesson.id', $id);

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
	public function getTable($type = 'Lesson', $prefix = 'TypingTable', $config = array())
	{
		return JTable::getInstance($type, $prefix, $config);
	}
 
	/**
	 * Get the lesson
	 *
	 * @param   integer  $id  Lesson Id
	 *
	 * @return  string        Fetched String from Table for relevant Id
	 */
	public function getItem($id = null)
	{
		// Request the selected id
		$id = (!empty($id)) ? $id : (int) $this->getState('lesson.id');
		
		if ($this->_item === null)
		{
			$this->_item = array();
		}
		
		if (!isset($this->_item[$id]))
		{
			try
			{	 
				// Get a TableLessons instance
				// The model now asks the TableLesson to get the lesson. This table class has to be defined in admin/tables/lesson.php file 
				$table = $this->getTable();
	 
				// Load the lesson
				$table->load($id);
	 
				// Assign the lesson
				$this->_item[$id] = $table;
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
					$this->_item[$id] = false;
				}
			}
		}

		return $this->_item[$id];
	}
}