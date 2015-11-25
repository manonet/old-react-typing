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
	<div id="statistic-details">
		<div class="stat-keyboard"></div>
		<div class="stat-keyboard2"></div>
	</div>

<button type="button" class="btn btn-secondary hasPopover" title="Header" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
  Popover on right
</button>

<button type="button" class="btn btn-secondary hasPopover" data-container="body" data-toggle="popover" data-placement="bottom" data-content="Vivamus
sagittis lacus vel augue laoreet rutrum faucibus.">
  Popover on bottom
</button>

<button type="button" class="btn btn-secondary hasPopover" data-container="body" data-toggle="popover" data-placement="left" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
  Popover on left
</button>

<button type="button" class="btn btn-secondary hasPopover" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
  Popover on top
</button>

<button type="button" class="btn btn-default hasTooltip" data-toggle="tooltip" data-placement="left" title="Tooltip on left">Tooltip on left</button>

<button type="button" class="btn btn-default hasTooltip" data-toggle="tooltip" data-placement="top" title="Tooltip on top">Tooltip on top</button>

<button type="button" class="btn btn-default hasTooltip" data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom">Tooltip on bottom</button>

<button type="button" class="btn btn-default hasTooltip" data-toggle="tooltip" data-placement="right" title="Tooltip on right">Tooltip on right</button>


<?php
}
?>
