<?php
defined( '_JEXEC' ) or die;

jimport('joomla.application.component.model');

class TypingModelSavestat extends JModelItem {

	public function saveStat() {
		
		// function for dividing with zero
		function division($a, $b) {         
			if($b === 0) {
				return null;
			} else {
				return $a/$b;
			}
		}
		
		// update the database
		$db = $this->getDbo();
		
		$input = new JInput;
		$user = JFactory::getUser();
		$userId = $user->get('id');
		$now = date("Y-m-d");
		
		$locale = $input->get('locale', '', 'post');
		$correct_hits = (int) $input->get('correct_hits', '', 'post');
		$miswrite_hits = (int) $input->get('miswrite_hits', '', 'post');
		$endurance = (int) $input->get('endurance', '', 'post');
		$correct_hits_array = json_decode($input->get('correct_hits_array', '', 'post'));
		$miswrite_hits_array = json_decode($input->get('miswrite_hits_array', '', 'post'));
		$misspell_hits_array = json_decode($input->get('misspell_hits_array', '', 'post'));
		
		$accuracy = division($correct_hits, $miswrite_hits + $correct_hits)*100;
		$speed = $correct_hits / ($endurance / 1000) * 60 ; // (cpm) goodchars / minutes * 60
		
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
				'accuracy=(correct_hits / (correct_hits + miswrite_hits))*100, ' .
				'speed=correct_hits / (endurance / 1000) * 60;'
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
		
		$written_stat = file_get_contents(JPATH_BASE . '\typing\userdata\statistic\user-' . $userId . '.json');
		$stat_json = json_decode($written_stat, true);
		$post_data = array(
			'endurance' => $endurance,
			'correct' => $correct_hits_array,
			'miswrite'=> $miswrite_hits_array,
			'misspell'=> $misspell_hits_array
		);
		
		if ($stat_json[$locale][$now] === null) {
			$stat_json[$locale][$now] = $post_data;
		} else {
			$stat_json[$locale][$now] = array_merge($stat_json[$locale][$now],$post_data);
		}
		
		// Save user.json data
		$fp = fopen(JPATH_BASE . '\typing\userdata\statistic\user-' . $userId . '.json', 'w');
		fwrite($fp, json_encode($stat_json, JSON_UNESCAPED_UNICODE));
		fclose($fp);
		
		
		return true;
	}
	
}
