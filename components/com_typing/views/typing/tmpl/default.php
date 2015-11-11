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

JHTML::_('behavior.modal');

?>
<h1><?php echo JText::_('TYPING_PROGRAM_TITLE'); ?></h1>

<div id="typing">
	<div id="textBoard"></div>
	<div id="hintBox"></div>
	
	<div id="keyBoard">
		<div id="E"></div>
		<div id="D"></div>
		<div id="C"></div>
		<div id="B"></div>
		<div id="A"></div>
	</div>
	
	<div id="messagebox"></div>
</div>

<a data-toggle="modal" data-target="#lessons-modal" href="<?php echo JUri::base(); ?>index.php?option=com_typing&view=lessons&layout=modal&tmpl=component" data-title="<?php echo JText::_('TYPING_PROGRAM_SELECT_LESSON'); ?>"><?php echo JText::_('TYPING_PROGRAM_SELECT_LESSON'); ?></a>    
<a data-toggle="modal" data-target="#keyboard-modal" href="<?php echo JUri::base(); ?>index.php?option=com_typing&view=keyboard&tmpl=component" data-title="<?php echo JText::_('TYPING_PROGRAM_SELECT_KEYBOARD'); ?>"><?php echo JText::_('TYPING_PROGRAM_SELECT_KEYBOARD'); ?></a>

<div class="modal fade" id="keyboard-modal" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
					<span class="sr-only">Close</span>
				</button>
				<h4 class="modal-title">keyboard</h4>
			</div>
			<div class="modal-body">
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				<button type="button" class="btn btn-primary">Save changes</button>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="lessons-modal" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
					<span class="sr-only">Close</span>
				</button>
				<h4 class="modal-title">lessons</h4>
			</div>
			<div class="modal-body">
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				<button type="button" class="btn btn-primary">Save changes</button>
			</div>
		</div>
	</div>
</div>
