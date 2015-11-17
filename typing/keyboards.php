<?php
// use valid directory
$currentWD = "C:\\webroot\\Dropbox\\www\\m5\\public_html";
$currentURL = "//webroot/m5/public_html";
$path = dirname(__FILE__);
$objects = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($path),
    RecursiveIteratorIterator::SELF_FIRST
);
$dirname = "";
$fileData = [];

foreach ($objects as $file => $object) {
    $basename = $object->getBasename();
    if ($basename == '.' or $basename == '..') {
        continue;
    }
    if ($object->isDir()) {
		$dirname=$object->getPathname();
        continue;
    }
	if (strpos($dirname,'svn') or strpos($dirname,'dtd') or strpos($dirname,'und')) {
        continue;
	}
	if (strpos($object->getPathname(),'-t-k0-')) {
		$xml=simplexml_load_file($object->getPathname()) or die("Error: Cannot create object");;
		
		$os = substr($dirname, strrpos($dirname, '\\') + 1);
		$lang = explode("-t-", $xml['locale'], 2)[0];
		$name = ''.$xml->names->name['value'];
		$url = str_replace($currentWD, $currentURL, $object->getPathname());
		$url = str_replace("\\", "/", $url);
		
		if ($fileData[$os][$lang] === null) {
			$fileData[$os][$lang][0] = array('name' => $name, 'url'=> $url);
		} else {
			array_push($fileData[$os][$lang],array('name' => $name, 'url'=> $url));
		}
	}
}

var_export($fileData);
$response['keyboards'] = $fileData;
$fp = fopen('keyboards.json', 'w');
fwrite($fp, json_encode($response));
fclose($fp);


/*
{
  "keyboards": {
    "os": {
      "lang": [
		  {
			"name": "myname1",
			"url": "http://1"
		  },
		  {
			"name": "myname2",
			"url": "http://2"
		  }
      ]
    }
  }
}
*/
?>