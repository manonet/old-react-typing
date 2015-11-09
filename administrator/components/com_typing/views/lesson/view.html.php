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

class TypingViewLesson extends JViewLegacy
{

	protected $item;
	protected $form;
	protected $script;
	protected $canDo;
	protected $state;

	public function display($tpl = null)
	{
		// Get data from the model
		$this->form		= $this->get('Form');
		$this->item		= $this->get('Item');
		$this->script	= $this->get('Script');
		$this->canDo	= TypingHelper::getActions($this->item->id);
		$this->state	= $this->get('State');
 
		// Check for errors.
		if (count($errors = $this->get('Errors')))
		{
			JError::raiseError(500, implode('<br />', $errors));
 
			return false;
		}
 
		// We don't need toolbar in the modal window.
		if ($this->getLayout() !== 'modal')
		{
			// Set the toolbar
			$this->addToolbar();
		}

		// Display the template
		parent::display($tpl);
		
		// Set the document
		$this->setDocument();
	}
	
	protected function addToolbar()
	{		
		// Get the toolbar object instance
		$bar		= JToolBar::getInstance('toolbar');
		
		$user		= JFactory::getUser();
		$userId		= $user->get('id');
		$isNew		= ($this->item->id == 0);
		$checkedOut	= !($this->item->checked_out == 0 || $this->item->checked_out == $userId);
		$canDo		= $this->canDo;
		
		/***************************************/
		//JFactory::getApplication()->input->set('hidemainmenu', true);

		if ($isNew)
		{
			JToolbarHelper::title(JText::_('COM_TYPING_LESSON_NEW'), 'pencil-2');
		}
		else
		{
			JToolbarHelper::title(JText::_('COM_TYPING_LESSON_EDIT'), 'pencil-2');
		}
		

		// For new records, check the create permission.
		if ($isNew && (count($user->getAuthorisedCategories('com_content', 'core.create')) > 0))
		{
			JToolbarHelper::apply('lesson.apply');
			JToolbarHelper::save('lesson.save');
			JToolbarHelper::save2new('lesson.save2new');
			JToolbarHelper::cancel('lesson.cancel');
		}
		else
		{
			// Can't save the record if it's checked out.
			if (!$checkedOut)
			{
				// Since it's an existing record, check the edit permission, or fall back to edit own if the owner.
				if ($canDo->get('core.edit') || ($canDo->get('core.edit.own') && $this->item->created_by == $userId))
				{
					JToolbarHelper::apply('lesson.apply');
					JToolbarHelper::save('lesson.save');

					// We can save this record, but check the create permission to see if we can return to make a new one.
					if ($canDo->get('core.create'))
					{
						JToolbarHelper::save2new('lesson.save2new');
					}
				}
			}

			// If checked out, we can still save
			if ($canDo->get('core.create'))
			{
				JToolbarHelper::save2copy('lesson.save2copy');
			}

			if ($this->state->params->get('save_history', 0) && $canDo->get('core.edit'))
			{
				JToolbarHelper::versions('com_content.lesson', $this->item->id);
			}

			JToolbarHelper::cancel('lesson.cancel', 'JTOOLBAR_CLOSE');
		}

	}
	
	protected function setDocument()
	{
		$isNew		= ($this->item->id < 1);
		$document	= JFactory::getDocument();
		$document->setTitle($isNew ? JText::_('COM_TYPING_LESSON_CREATING') : JText::_('COM_TYPING_LESSON_EDITING'));
		
		$document->addScript(JURI::root() . $this->script);
		$document->addScript(JURI::root() . "/administrator/components/com_typing/views/lesson/submitbutton.js");
	}
}