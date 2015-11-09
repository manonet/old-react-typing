<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_typing
 *
 * @copyright   Copyright (C) 2005 - 2015 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die('Restricted access');

// Include the component HTML helpers.
JHtml::addIncludePath(JPATH_COMPONENT . '/helpers/html');

?>

<form action="<?php echo JRoute::_('index.php?option=com_typing&layout=add&id=' . (int) $this->item->id); ?>" method="post" name="adminForm" id="adminForm" class="form-validate">

    <input type="hidden" name="option" value="com_typing" />
	<input type="hidden" name="task" value="" />
	<?php echo JHtml::_('form.token'); ?>

</form>