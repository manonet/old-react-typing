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
 * Typing Component Controller
 *
 * @since  0.0.1
 */
class TypingController extends JControllerLegacy
{
	
	public function lesson() 
	{
		// Set view
		$this->input->set('view', 'Lesson');

		parent::display();
	}
	
	public function lessons() 
	{
		// Set view
		$this->input->set('view', 'Lessons');

		parent::display();
	}
	
	public function statistic() 
	{
		// Set view
		$this->input->set('view', 'Statistic');

		parent::display();
	}
	public function keyboard() 
	{
		// Set view
		$this->input->set('view', 'Keyboard');

		parent::display();
	}
	
	function savestat()
	{
        // Get the application object.
        $app = JFactory::getApplication();

        // Get the model.
        $model = $this->getModel('savestat');
		$model->saveStat();
        // Close the application.
        $app->close();
    }
}