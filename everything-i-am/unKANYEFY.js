function unKANYEFY() {
  (function($) {
    $.unKANYEFY = {
      /* KANYE TAXONOMY... */
      proper_nouns : [
        /* kanYe! & Co. */
        'al', 'kanYe West', 'kanYe', 'Mr. West', 'Kanye\'s',
        /* Products */
        'Louie Vuitton', 'Louis Vuitton', 'Bentley', 'Chanel', 'Vibe', 'Apple', 'Twitter', 'Nike',
        /* Rappers */
        'Pharrell', 'Andre 3000', 'Jay-Z', 'Beyonce', 'Noreaga', 'Yeezy', 'YeYo', 'M.I.A', 'PINK', 'Talib Kweli', 'Diddy', 'Madonna', 'Amber',
        /* Places */
        'LA', 'CA', 'California', 'Cali', 'Los Angeles', 'Miami', 'NYC', 'New York City', 'New York', 'Chi-town', 'Chicago', 'SoHo', 'Chi-city', 'IL', 'NY', 'USA', 'SF', 'San Francisco', 'Florida', 'FL',
        /* Lingo */
        'WTF', 'OMG', 'LOL', 'HAHA', 'HEHE', 'I', 'CAPS LOCK',
        /* CREDIT */
        'FFFFFAT', 'FAT Lab', 'F.A.T. Lab', 'FFFFF.AT'
      ],
      skip_words : ['is'],
      alphabet : ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
      marks : ['.', ',', '?', '!', '"', '\'', ':', ';', ')', '('],
      types : ['s', '\'s', 's\'', ''],
      lc : {proper_nouns : []},
      obj : {proper_nouns_lc : [], skip_words : []},

      /* Repair the damage... */
  	  _eval : function(val) {
        if (val && val != '') {

          // KANYE CLEANUPS. Get rid of extra !, ?, and .'s. (Also remove extra white space and newlines for easier parsing)
          val = val.replace(/(\.\.\.)/g, '&hellip;').replace(/\.\.\./g, '.').replace(/\.\./g, '.').replace(/\!\!\!/g, '!').replace(/\!\!/g, '!').replace(/\?\?\?/g, '!').replace(/\?\?/g, '?').replace(/\s\s/ig, ' ').replace(/\n/ig, '');

          // Go through loop and detect if any words are uppercase. If entire word is uppercase, then downcase and match if a proper noun.
          val = val.split(' ');
          for (var i=0; i<val.length; i++) {
            if (/[A-Z0-9\-\.\!\?]+/.test(val[i])) {
              val[i] = val[i].toLowerCase();
              // Do a quick match to proper_nouns
              if ($.unKANYEFY.obj.proper_nouns[val[i]] >= 0) val[i] = $.unKANYEFY.proper_nouns[$.unKANYEFY.obj.proper_nouns[val[i]]];
            }
          }
          val = val.join(" ");

          // String replaces for proper_nouns (gets the two+ worded ones and missed-capitalized ones.)
          for (var i=0; i<$.unKANYEFY.proper_nouns.length; i++) {
            var x = $.unKANYEFY.lc.proper_nouns[i].replace(/\./g, '\\\.').replace(/\|/g, '\\\|');
            for (var j=0; j<$.unKANYEFY.types.length; j++) {
              if ($.unKANYEFY.obj.skip_words[(x+' '+$.unKANYEFY.types[j])] < 0) {
                var z = $.unKANYEFY.types[j].replace('\'', '\\\'');
                // Quick match
                var r = new RegExp('(\\s'+x+z+'\\s)|(\\s'+x+z+'$)|^('+x+z+'\\s)', 'g');
                if (val.match(r)) val = val.replace(r, ' '+ $.unKANYEFY.proper_nouns[i] + $.unKANYEFY.types[j] +' ');
                // Precise matches (words with punctuation at the end)
                var s = new RegExp('(\\s'+x+z+')+(\\.|\\!\\?|\\,|\\"|\\\'|\\)|\\]|\\&)+', 'g');
                if (val.match(s)) val = val.replace(s, ' '+ $.unKANYEFY.proper_nouns[i] + $.unKANYEFY.types[j] +'$2');
              }
            }
          }

          // Go through each sentence and replace first letter with its uppercase letter
          for (var i=0; i<$.unKANYEFY.alphabet.length; i++) {
            var r = new RegExp('(\\.|\\?|\\!|\\.\\"|\\?\\"|\\!\\")\\s'+ $.unKANYEFY.alphabet[i], 'g');
            val = val.replace(r, '$1 '+ $.unKANYEFY.alphabet[i].toUpperCase());
          }
    
          // Since the first block of each sentence needs tp be capitalized, do it manually (as above loop won't catch it).
          val = val[0].toUpperCase()+val.substr(1);
        }

        // ITS THAT EASY!
        return val;
      },
      _make_lowercase_array : function(arr) {var arr_lc = []; if (typeof(arr) == 'object') {for (i=0; i<arr.length; i++) arr_lc[i] = arr[i].toLowerCase();} return arr_lc;},
      _make_keyed_object : function(arr) {var arr_k = {}, v; if (typeof(arr) == 'object') {for (i=0; i<arr.length; i++) {v = arr[i]; arr_k[v] = i;}} return arr_k;},
  	  init : false, interval : false, done : false,
  	  close : function () {jQuery("#unkanyefy_load").fadeOut(500, function() {jQuery(this).remove();});},
  	  timeout : function(i) {
  	    setTimeout(function() {if ($.unKANYEFY.done) {$.unKANYEFY.close();} else {$.unKANYEFY.timeout(250);}}, i);
      }
    };

    $.fn.unKANYEFY = function(settings) {
      if (!$.unKANYEFY.init) {
        $.unKANYEFY.lc.proper_nouns = $.unKANYEFY._make_lowercase_array($.unKANYEFY.proper_nouns);
        $.unKANYEFY.obj.proper_nouns = $.unKANYEFY._make_keyed_object($.unKANYEFY.lc.proper_nouns);
        $.unKANYEFY.obj.skip_words = $.unKANYEFY._make_keyed_object($.unKANYEFY.skip_words);

        // Make an attempt to force normalize text case (esp. if using KANYEIFY)
        jQuery('style#KANYEIFY').remove();
        jQuery('body').append('<style type="text/css" id="KANYEIFY">html, body {text-transform: none !important;}</style>');
        $.unKANYEFY.init = true;
      }

      $.unKANYEFY.timeout(2000);


      var done = this.each(function() {
        if (this.nodeType == 1) {
          var g = this.tagName.toLowerCase();
          if (this.className == 'unKANYEFY' || g == 'style' || g == 'object' || g == 'embed' || g == 'head' || g == 'img' || g == 'script') return this;
        }

        if (this.nodeType == 3) {
          if (this.nodeValue.replace(/\s/ig, '') != '') {
            jQuery(this).after($.unKANYEFY._eval(this.nodeValue));
            this.nodeValue = '';
          }
        } else if (this.nodeType == 1) {
          if (jQuery(this).children().length > 0) {
            jQuery(this).contents().unKANYEFY();
          } else if (jQuery(this).children().length == 0) {
            jQuery(this).html($.unKANYEFY._eval(jQuery(this).text()));
          } else {
            // what do you want me to do?
          }
        }
      });
      
      jQuery('img[src=http://www.kanyeuniversecity.com/images/blogHeader.gif]').attr('src', 'everything-i-am/logo_lowercase.gif');
      $.unKANYEFY.done = true;
      return done;
    };
  })(jQuery);

  jQuery('html').unKANYEFY();
}


// Load jQuery only if not present on site.
if (typeof(jQuery) == 'undefined') {
  var GM_JQ = document.createElement('script');
  GM_JQ.src = 'http://www.lowercasekanye.com/yeezy/everything-i-am/jquery-1.3.2.js';//'http://jquery.com/src/jquery-latest.js';
  GM_JQ.type = 'text/javascript';
  document.getElementsByTagName('head')[0].appendChild(GM_JQ);
  function load_jQuery() {if (typeof(jQuery) == 'undefined') {window.setTimeout(load_jQuery,100);} else {unKANYEFY();}}
  load_jQuery();
} else {
  unKANYEFY();
}