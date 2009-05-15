function unKANYEFY() {
  (function($) {
    $.unKANYEFY = {
      /* KANYE TAXONOMY... */
      proper_nouns : [
        /* kanYe! & Co. */
        'al', 'kanYe West', 'kanYe', 'Mr. West', 
        /* Products */
        'Louie Vuitton', 'Louis Vuitton', 'Bentley', 'Chanel', 'Vibe', 'Apple', 'Twitter', 'Nike',
        /* Rappers */
        'Pharrell', 'Andre 3000', 'Jay-Z', 'Beyonce', 'Noreaga', 'Yeezy', 'YeYo', 'M.I.A', 'PINK', 'Talib Kweli', 'Diddy',
        /* Places */
        'LA', 'CA', 'California', 'Cali', 'Los Angeles', 'Miami', 'NYC', 'New York City', 'New York', 'Chi-town', 'Chicago', 'SoHo', 'Chi-city', 'IL', 'NY', 'USA', 'SF', 'San Francisco', 'Florida', 'FL',
        /* Lingo */
        'WTF', 'OMG', 'LOL', 'HAHA', 'HEHE', 'I', 'CAPS LOCK'
      ],
      skip_words : ['is'],
      always_downcase : ['a', 'the', 'an', 'of', 'by'], 
      alphabet : ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
      marks : ['.', ',', '?', '!', '"', '\'', ':', ';', ')', '('],
      types : ['s', '\'s', 's\'', ''],
      lc : {proper_nouns : []},
      obj : {proper_nouns_lc : {}, skip_words : {}},

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
              //var k = jQuery.inArray(val[i], proper_nouns_lc);
              if ($.unKANYEFY.obj.proper_nouns[val[i]] >= 0) val[i] = $.unKANYEFY.proper_nouns[$.unKANYEFY.obj.proper_nouns[val[i]]];
            }
          }
          val = val.join(" ");

          // String replaces for proper_nouns (gets the two+ worded ones and missed-capitalized ones.)
          for (var i=0; i<$.unKANYEFY.proper_nouns.length; i++) {
            var x = $.unKANYEFY.lc.proper_nouns[i].replace(/\./g, '\\\.').replace(/\|/g, '\\\|');
            for (var j=0; j<$.unKANYEFY.types.length; j++) {
              if ($.unKANYEFY.obj.skip_words[(x+''+$.unKANYEFY.types[j])] < 0) {
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
      _make_lowercase_array : function(arr) {var arr_lc = arr; if (typeof(arr_lc) == 'object') {for (i=0; i<arr_lc.length; i++) arr_lc[i] = arr_lc[i].toLowerCase();} return arr_lc;},
      _make_keyed_object : function(arr) {var obj = {}; if (typeof(arr) == 'object') {for (i=0; i<arr.length; i++) obj[ arr[i] ] = i;} return obj;},
  	  init : false
    };

    $.fn.unKANYEFY = function(settings) {
      if (!$.unKANYEFY.init) {
        $.unKANYEFY.lc.proper_nouns = $.unKANYEFY._make_lowercase_array($.unKANYEFY.proper_nouns);
        $.unKANYEFY.obj.proper_nouns = $.unKANYEFY._make_lowercase_array($.unKANYEFY.lc.proper_nouns);
        $.unKANYEFY.obj.skip_words = $.unKANYEFY._make_lowercase_array($.unKANYEFY.skip_words);

        // Make an attempt to force normalize text case (esp. if using KANYEIFY)
        jQuery('style#KANYEIFY').remove();
        jQuery('body').append('<style type="text/css" id="KANYEIFY">html, body {text-transform: normal !important;}</style>');
        $.unKANYEFY.init = true;
      }

      return this.each(function() {
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
      }).find("#unkanyefy_load").fadeOut(1000, function() {$(this).remove();});
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