/////////////////////////////////////////////////////////////
// AUTHOR: Nick LaPrell (Nick@LaPrell.org)
// PROJECT HOME: http://code.google.com/p/pluginloader/
// LICENSE: MIT - http://www.opensource.org/licenses/mit-license.php  
/////////////////////////////////////////////////////////////

(function($){
	
	// Define defaults
	jqDEFAULT_PLUGIN_PATH = '/plugins/';
	jqDEFAULT_SCRIPT_PATH = '';
	jqDEFAULT_LIB_PATH = '/lib/';
	jqDEFAULT_CSS_PATH = '/plugins/css/';
	jqDEFAULT_CACHE = true;
	jqDEFAULT_ASYNC = null;

	// Define which plugins are called
	jqLoaded = {
		plugins:['pluginLoader'],
		scripts:[],
		libs:[],
		css:[]
	};	
	

	// The following three functions are wrappers for $.loadJS that set the default path if one is not supplied.
	
	$.loadPlugins = function(params) {
		params = setParams(params);
		// Configure the path
		params.path = typeof params.path == 'undefined' ? jqDEFAULT_PLUGIN_PATH : params.path;
		$.loadJS(params,'plugins');
	};
	
	$.loadScripts = function(params) {
		params = setParams(params);
		// Configure the path
		params.path = typeof params.path == 'undefined' ? jqDEFAULT_SCRIPT_PATH : params.path;
		$.loadJS(params,'scripts');
	};
	
	$.loadLibs = function(params) {
		params = setParams(params);
		// Configure the path
		params.path = typeof params.path == 'undefined' ? jqDEFAULT_LIB_PATH : params.path;
		$.loadJS(params,'libs');
	};
	
	// This is where the magic happens.
	$.loadJS = function(params,scriptType){
		
		// Capture the current async setting
		var originalAsync = $.ajaxSettings.async;

		// Configure defaults
		params.list = params.list instanceof Array === false ? [params.list] : params.list;
		params.cache = typeof params.cache == 'undefined' ? jqDEFAULT_CACHE : params.cache;
		params.async = typeof params.async == 'undefined' ? jqDEFAULT_ASYNC === null ? originalAsync : jqDEFAULT_ASYNC : params.async;
		
		// Set async
	    $.ajaxSetup({async: params.async});
		
		// Process the list
		for (var i = 0; i < params.list.length; ++i) {
			// Only process plugins that have not already been added.
      		if(!inArray(params.list[i],jqLoaded[scriptType])){
				// Build the plugin path.
	        	var newScript = params.path + "jquery." + params.list[i] + ".js";
				// append a random query parameter if caching is off.
				newScript += params.cache ? '' : "?" + Math.random();
				// Fetch the script
	        	$.getScript(newScript);
				jqLoaded[scriptType].push(params.list[i]);
	      	}
	    }
		
		// Return the ajax setup to what it was previously.
    	$.ajaxSetup({async: originalAsync});
	};
	
	$.loadCSS = function(params) {
		params = setParams(params);
		// Configure defaults
		params.list = params.list instanceof Array === false ? [params.list] : params.list;
		params.cache = typeof params.cache == 'undefined' ? jqDEFAULT_CACHE : params.cache;
		params.path = typeof params.path == 'undefined' ? jqDEFAULT_CSS_PATH : params.path;
	
		// Start building a list of CSS link tags
		var CSSTags = '';
		
		// Process the list
	    for (var i = 0; i < params.list.length; ++i) {
			// Only process stylesheets that have not already been added.
			if(!inArray(params.list[i],jqLoaded.css)){
   				jqLoaded.css.push(params.list[i]);
	        	CSSTags += '<link type="text/css" href="' + params.path + 'jquery.' + params.list[i] + '.css';
				// append a random query parameter if caching is off.
				CSSTags += params.cache ? '' : '?' + Math.random();
				CSSTags += '" rel="Stylesheet" />';
	      	}
	    }
		
		// Append the stylesheets one the DOM has loaded.
    	$(document).ready(function(){
			$("head").append(CSSTags);
		});
	};
  
})(jQuery);

// Utility functions
function inArray(needle,haystack){
	for(var i = 0; i < haystack.length; ++i){
		if(needle==haystack[i]){return true;}
	}
	return false;
}

// Backards compatibility for version <= 1.5
function setParams(params){
	var p = {};
	if((params instanceof Object) && (!params instanceof Array)){
		p = params;
	} else {
		p.list = params;
	}
	return p;
}
