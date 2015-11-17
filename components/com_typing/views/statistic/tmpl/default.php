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


if (!$this->item->id) {
	// empty statistic
	echo "no data, <a href='index.php?option=com_typing&view=typing'>type some first...</a>";
	
} else {
	// display data
?>
	<h1>Statistic</h1>
	<p>correct_hits: <?php echo $this->item->correct_hits; ?></p>
	<p>miswrite_hits: <?php echo $this->item->miswrite_hits; ?></p>
	<p>endurance: <?php echo $this->item->endurance; ?></p>
	<p>accuracy: <?php echo $this->item->accuracy; ?></p>
	<p>speed: <?php echo $this->item->speed; ?></p>
	<button id="get-detailed-stat" class="btn btn-primary">detailed-stat</button>
	<div id="statistic-details"></div>
<?php
}
?>
