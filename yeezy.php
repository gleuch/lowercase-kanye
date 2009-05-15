<?php

/*
 Goals:
    1. Get url (/blog/~)
    2. Parse out HTML
    3. ?????
    4. PROFIT!
*/

error_reporting(0);


$WhereAreYa = new Yeezy();

// They wanna rap and make soul beats just like you...
$WhereAreYa->MakeSoulBeats();

// ...but they just not you.
exit;



/* --------------- */

class Yeezy {
  public $Persona = 'http://www.lowercasekanye.com/yeezy/';
  public $GettingLaid = 'love-lockdown';
  public $Asssssets = 'everything-i-am';
  public $Yeezy = 'http://www.kanyeuniversecity.com/blog';
  public $FameTime = 600; // Time in seconds (default 10 min)
  public $Graduation = false;//true; // DEBUG
  
  protected $content = array();
  protected $page = '';
  protected $GettingPaid = '';
  protected $ShoesAndCars = '';
  protected $Kids = 0;


  public function Yeezy() {
    $this->Kids = microtime_float();
    // Follow your dreams:
    $this->page = str_replace(str_replace(dirname($this->Persona), '', $this->Persona), '', $_SERVER['REQUEST_URI']);
    $this->GettingPaid = md5(empty($this->page) ? 'index' : $this->page);

    $this->NowTurnItUp();

    if ($this->Impersonator() || $this->Graduation) {
      $this->Homecoming();
    } else {
      $this->TouchTheSky();
    }
  }

  public function Impersonator() {
    return !(is_file('./'. $this->GettingLaid .'/'. $this->GettingPaid) && filemtime('./'. $this->GettingLaid .'/'. $this->GettingPaid) < (date("U")-$this->famoTime));
  }

  public function NowTurnItUp() {
    if (!is_dir('./'. $this->GettingLaid)) mkdir('./'. $this->GettingLaid, 0777);
    if (!is_writable('./'. $this->GettingLaid)) chmod(0777, './'. $this->GettingLaid);

    // Jesus Walks... if you can find him stumbling back home (clears cache)
    if (strtolower($this->page) == "findingjesus") {
      echo '<h3>Finding Jesus</h3>';
      if ($handle = opendir('./'. $this->GettingLaid)) {
        $i = 0;
        while (false !== ($file = readdir($handle))) {
          if (is_file('./'. $this->GettingLaid .'/'. $file) && $file != '.' && $file != '..') {
            $i++;
            unlink('./'. $this->GettingLaid .'/'. $file);
          }
        }
        closedir($handle);
        echo 'Cleaned '. $i .' cache files.';
      } else {
        echo 'No cache files cleaned.';
      }
      exit;
    }
  }

  public function Homecoming() {
    // Break out!
    list($this->content['header'], $this->content['content']) = explode('<body>', file_get_contents($this->Yeezy .'/'. $this->page));
    list($this->content['content'], $this->content['footer']) = explode('</body>', $this->content['content']);

    // Cleanup header
    $f = array('/(href|src)(\=\"\/)/im', '/(href|src)(\=")(?!http)/im');
    $r = array('${1}="'. dirname($this->Yeezy) .'/', '${1}="'. $this->Yeezy .'/');
    $this->content['header'] = preg_replace($f, $r, $this->content['header']);
    $this->content['header'] = preg_replace('/(<title>)/i', '${1}lowercasekanye.com » ', $this->content['header']);

    // Cleanup Content
    $f = array('/(\.\.\/includes\/nav\.php)/im', '/(href)(\=\")(\/blog)(\/)?/im', '/(href)(\=\")(http|https)(\:\/\/)(www\.)?(kanyeuniversecity\.com)(?!\/client_images|\/synd)(\/blog)?(\/)/im', '/(SWFObject\(\")(\/)(swf)/im', '/(\.\.)(\/)/im', '/(src=\")(\/images)/im', '/(href)(\=\")(\/)/im', '/(\/\/)(so.addParam)/im');
    $r = array($this->Persona .'nav.html', '${1}${2}'. $this->Persona, '${1}${2}'. $this->Persona .'${8}', '${1}'. $this->Persona . $this->Asssssets, dirname($this->Yeezy) .'/', '${1}'. dirname($this->Yeezy) .'${2}', '${1}${2}'. dirname($this->Yeezy) .'${3}', '${2}');
    $this->content['content'] = preg_replace($f, $r, $this->content['content']);
    
    
    // OH YEAH. WE HATE ADS.
    $this->content['content'] = preg_replace(array("/(http|https)(\:\/\/)([a-z0-9\-\.]+)(fmpub|doubleclick)([a-z0-9\-\.\/\;\=\?]+)/im", "/(src=)(\"\"|''|\"' \+ ord \+ '\?\")/im"), '', $this->content['content']);

    // Making it FFFFF.AT!!!!!!!!
    $this->content['content'] = preg_replace("/(id\=\"linksList\"\>)/im", '${1}<li><a href="http://www.fffff.at" target="_fffffat">My homies @ FFFFF.AT!!!!!</a></li>', $this->content['content']);
    $this->content['content'] = preg_replace("/(\<div id\=\"footer\"\>)([\s\S\n]+)(\<\/div\>)/im", '${1}<div style="color: #ff00ff;">hacked by <a style="color: #fff000;" href="http://www.fffff.at" target="_fffffat">FFFFF.AT</a> with loves and hugs.</div>${3}', $this->content['content']);

    // We want the hits.......
    $this->content['content'] = preg_replace("/(\<script src\=\"http\:\/\/www\.google)([\s\S\n]+)(<\/script>)([\s\S\n]+)(<\/script>)/im", "<script type=\"text/javascript\">var gaJsHost = ((\"https:\" == document.location.protocol) ? \"https://ssl.\" : \"http://www.\");document.write(unescape(\"%3Cscript src='\" + gaJsHost + \"google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E\"));</script>\n<script type=\"text/javascript\">try {var pageTracker = _gat._getTracker(\"UA-2855868-12\");pageTracker._trackPageview();} catch(err) {}</script>", $this->content['content']);

    // Add unKANYEIFY to footer
    $this->content['content'] .= '<script type="text/javascript" src="'. $this->Persona . $this->Asssssets .'/unKANYEFY.js"></script>';


    // Getting ready to drop jams!
    $this->content['header'] .= "<style type=\"text/css\">#fffffat {position: absolute; font-weight: bold; width: 100%; border-bottom: 3px solid #ff00ff; top: 0; left: 0; height: auto; background: #FFF000; color: #000; margin: 0; text-align: center; font-size: 14px; z-index: 1100;}#fffffat div {padding: 12px 20px;}#fffffat a {color: #FF00FF;}#fffffat a:hover {color: #000;}#fffffat strong {text-transform: uppercase !important;}#fffffat span {font-size: 12px; padding-left: 12px; font-weight: normal;}#fffffat span a:last-child {text-transform: lowercase !important;}#unkanyefy_load {position: fixed; background: url(". $this->Persona . $this->Asssssets ."/bg.png) top left repeat; top: 0; left: 0; width: 100%; height: 100%; z-index: 1000;}#unkanyefy_load div {text-align: center; width: 450px; margin: 150px auto 0 auto;}#unkanyefy_load div p {padding: 0; margin: 10px 0 0 0; font-size: 18px; font-weight: bold; color: #000;}</style>";

    $this->ShoesAndCars = $this->content['header'] ."\n<body style=\"margin-top: 45px;\"><div id=\"fffffat\" class=\"unKANYEFY\"><div><strong>LOWERCASE KANYE</strong>, a <a href=\"http://fffff.at\" target=\"_fffffat\"><strong>F.A.T. Lab</strong> project</a>. <span style=\"text-transform: none !important;\"><a href=\"http://fffff.at/lowercase-kanye\" target=\"_fffffat\">Read about this project</a> and get the <a href=\"http://www.github.com/gleuch/unKANYEFY\" target=\"_srcode\">source code</a>.</span></div></div><div id=\"unkanyefy_load\" class=\"unKANYEFY\"><div><img src=\"". $this->Persona . $this->Asssssets ."/loading.gif\" /><p>Please be patient while we repair the damage done by Kanye’s CAPS LOCK button.</p></div></div>\n". $this->content['content'] ."\n</body>\n".$content['footer'];

    // Cache the file (except for graduates)
    if (!$this->Graduation) file_put_contents('./'. $this->GettingLaid .'/'. $this->GettingPaid, $this->ShoesAndCars);

  }

  public function TouchTheSky() {
    $this->ShoesAndCars = file_get_contents('./'. $this->GettingLaid .'/'. $this->GettingPaid);
  }

  public function MakeSoulBeats() {
    echo $this->ShoesAndCars;
    if ($this->Graduation) echo "<p>Time took: ". round((microtime_float() - $this->Kids),5) ." seconds.</p>";
  }
}

function microtime_float() {list($usec, $sec) = explode(" ", microtime()); return ((float)$usec + (float)$sec);}

?>