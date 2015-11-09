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

<a class="modal" href="<?php echo JUri::base(); ?>index.php?option=com_typing&view=lessons&layout=modal&tmpl=component" title="lessons" rel="{handler: 'iframe', size: {x: 600, y: 450}}"><?php echo JText::_('TYPING_PROGRAM_SELECT_LESSON'); ?></a>    
<a class="modal" id="selectKeyboard" href="<?php echo JUri::base(); ?>index.php?option=com_typing&view=keyboard&tmpl=component" title="keyboards" rel="{handler: 'iframe', size: {x: 600, y: 450}}"><?php echo JText::_('TYPING_PROGRAM_SELECT_KEYBOARD'); ?></a>    