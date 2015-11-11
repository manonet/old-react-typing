<?php
defined( '_JEXEC' ) or die;

jimport('joomla.application.component.model');

class TypingModelSavestat extends JModelItem {

	public function saveStat() {
		
		function division($a, $b) {         
			if($b === 0) {
				return null;
			} else {
				return $a/$b;
			}
		}
		
		$db = $this->getDbo();
		
		$input = new JInput;
		$user = JFactory::getUser();
		$userId = $user->get('id');
		$now = date("Y-m-d");
		$correct_hits = (int) $input->get('correct_hits', '', 'post');
		$miswrite_hits = (int) $input->get('miswrite_hits', '', 'post');
		$endurance = (int) $input->get('endurance', '', 'post');
		$accuracy = division($correct_hits, $miswrite_hits + $correct_hits);
		$speed = $correct_hits / round(($endurance / 1000) % 60); // seconds
		
		$db->setQuery(
			'INSERT INTO #__typing_statistics ( user_id, created, updated, correct_hits, miswrite_hits, endurance, accuracy, speed )' .
				' VALUES ( ' .
				$userId . ', ' .
				$db->quote($now) . ', ' .
				$db->quote($now) . ', ' .
				$correct_hits . ', ' .
				$miswrite_hits . ', ' .
				$endurance . ', ' .
				$accuracy . ', ' .
				$speed . ' )' .
			'ON DUPLICATE KEY UPDATE ' .
				'updated=' . $db->quote($now) . ', ' .
				'correct_hits=correct_hits+' . $correct_hits . ', ' .
				'miswrite_hits=miswrite_hits+' . $miswrite_hits . ', ' .
				'endurance=endurance+' . $endurance . ', ' .
				'accuracy=(correct_hits / (correct_hits + miswrite_hits)), ' .
				'speed=correct_hits / ROUND( MOD(endurance, 1000), 60);'
		);
		
		try
		{
			$db->execute();
		}
		catch (RuntimeException $e)
		{
			JError::raiseWarning(500, $db->getMessage());

			return false;
		}
		
		return true;
	}
	
}
