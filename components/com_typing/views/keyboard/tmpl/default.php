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
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>

<h1>Select</h1>

<form id="selectKbd">
	<select id="os">
		<option/>
	</select>
	<br/>
	<select id="lang" disabled="disabled">
		<option/>
	</select>
	<br/>
	<select id="locale" disabled="disabled">
		<option/>
	</select>
</form>

<script type="text/javascript">
jQuery( document ).ready(function() {
	var os = "";
	var kbdJSON = baseURL + "typing/keyboards.json";
		jQuery.getJSON( kbdJSON, {
		format: "json"
	})
	.done(function( data ) {
		jQuery.each(data, function(index, element) {
			// keyboards node
			jQuery.each(element, function(i, item) {
				// os node
				jQuery('#os').append(jQuery('<option>', {
					'value': i,
					'text': i
				}));
			});
		});
		
		jQuery('#os').change(function() {
			jQuery('#lang').empty().append(jQuery('<option>'));
			jQuery('#locale').empty().append(jQuery('<option>'));
			
			os = jQuery(this).val();
			jQuery.each(data.keyboards, function(index, element) {
				if (index === os) {
					jQuery.each(element, function(i, item) {
						// lang node
						jQuery('#lang').append(jQuery('<option>', {
							'value': i,
							'text': i
						}));
						jQuery('#lang').prop("disabled", false);
					});
				}
			});
		});
		
		jQuery('#lang').change(function() {
			jQuery('#locale').empty().append(jQuery('<option>'));
			
			lang = jQuery(this).val();
			jQuery.each(data.keyboards[os], function(index, element) {
				if (index === lang) {
					jQuery.each(element, function(i, item) {
						// locale node
						jQuery('#locale').append(jQuery('<option>', {
							'value': item.url,
							'text': item.name
						}));
						jQuery('#locale').prop("disabled", false);
					});
				}
			});
			
		});
		jQuery('#locale').change(function() {
			window.parent.params.keyboardURL = jQuery(this).val();
			window.parent.kbd.getKeyBoard();
		});
	});
});
</script>
