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
?>
<h1>Lessons</h1>
<ul>
	<?php foreach($this->items as $item) : ?>
		<li>
			<a href="index.php?option=com_typing&view=lesson&id=<?php echo $this->escape($item->id); ?>">
				<?php echo $this->escape($item->title); ?>
			</a>
		</li>
	<?php endforeach; ?>
</ul>