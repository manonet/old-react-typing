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

class TypingViewLessons extends JViewLegacy
{
	protected $items;
	protected $pagination;
	protected $canDo;
	
	public function display($tpl = null)
	{
		// Get application
		$app = JFactory::getApplication();
		$context = "typing.list.admin.lesson";
		
		// Get data from the model
		$this->items			= $this->get('Items');
		$this->pagination		= $this->get('Pagination');
		
		$this->state			= $this->get('State');
		$this->filter_order 	= $app->getUserStateFromRequest($context.'filter_order', 'filter_order', 'lesson', 'cmd');
		$this->filter_order_Dir = $app->getUserStateFromRequest($context.'filter_order_Dir', 'filter_order_Dir', 'asc', 'cmd');
		$this->filterForm    	= $this->get('FilterForm');
		$this->activeFilters 	= $this->get('ActiveFilters');

		// What Access Permissions does this user have?
		$this->canDo = JHelperContent::getActions('com_typing', 'category', $this->state->get('filter.category_id'));
		
		// Check for errors.
		if (count($errors = $this->get('Errors')))
		{
			JError::raiseError(500, implode('<br />', $errors));
 
			return false;
		}
 
		// We don't need toolbar in the modal window.
		if ($this->getLayout() !== 'modal')
		{
			$this->addToolbar();
			
			TypingHelper::addSubmenu('lessons');
			$this->sidebar = JHtmlSidebar::render();
		}

		// Display the template
		parent::display($tpl);
		
		// Set the document
		$this->setDocument();
	}
	
	protected function addToolbar()
	{
		$canDo	= $this->canDo;
		$user  = JFactory::getUser();
		// Get the toolbar object instance
		$bar = JToolBar::getInstance('toolbar');

		JToolbarHelper::title(JText::_('COM_TYPING_LESSONS_TITLE'), 'stack lesson');
		
		if ($canDo->get('core.create') || (count($user->getAuthorisedCategories('com_typing', 'core.create'))) > 0 )
		{
			JToolbarHelper::addNew('lesson.add', 'JTOOLBAR_NEW');
		}
		if ($this->canDo->get('core.edit')) 
		{
			JToolBarHelper::editList('lesson.edit', 'JTOOLBAR_EDIT');
		}
		if ($canDo->get('core.edit.state'))
		{
			JToolbarHelper::publish('lessons.publish', 'JTOOLBAR_PUBLISH', true);
			JToolbarHelper::unpublish('lessons.unpublish', 'JTOOLBAR_UNPUBLISH', true);
			JToolbarHelper::checkin('lessons.checkin');
		}
		if ($this->canDo->get('core.delete')) 
		{
			JToolbarHelper::divider();
			JToolBarHelper::deleteList('', 'lessons.delete', 'JTOOLBAR_DELETE');
		}
		
		// Add the 'Options' toolbar button when user is authorised for it
		// TODO
		if ($user->authorise('core.admin', 'com_typing') || $user->authorise('core.options', 'com_typing'))
		{
			JToolbarHelper::preferences('com_typing');
		}

	}
	
	protected function setDocument()
	{
		$document = JFactory::getDocument();
		$document->setTitle(JText::_('COM_TYPING_ADMINISTRATION'));
	}
}