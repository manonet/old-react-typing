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
$( document ).ready(function() {
	var os = "";
	var kbdJSON = "//webroot/m5/public_html/typing/keyboards.json";
		$.getJSON( kbdJSON, {
		format: "json"
	})
	.done(function( data ) {
		$.each(data, function(index, element) {
			// keyboards node
			$.each(element, function(i, item) {
				// os node
				$('#os').append($('<option>', {
					'value': i,
					'text': i
				}));
			});
		});
		
		$('#os').change(function() {
			$('#lang').empty().append($('<option>'));
			$('#locale').empty().append($('<option>'));
			
			os = $(this).val();
			$.each(data.keyboards, function(index, element) {
				if (index === os) {
					console.log(index);
					$.each(element, function(i, item) {
						// lang node
						$('#lang').append($('<option>', {
							'value': i,
							'text': i
						}));
						$('#lang').prop("disabled", false);
					});
				}
			});
		});
		
		$('#lang').change(function() {
			$('#locale').empty().append($('<option>'));
			
			lang = $(this).val();
			$.each(data.keyboards[os], function(index, element) {
				if (index === lang) {
					$.each(element, function(i, item) {
						// locale node
						$('#locale').append($('<option>', {
							'value': item.url,
							'text': item.name
						}));
						$('#locale').prop("disabled", false);
					});
				}
			});
			
		});
		$('#locale').change(function() {
			window.parent.params.keyboardURL = $(this).val();
			window.parent.kbd.getKeyBoard();
		});
	});
});
</script>
