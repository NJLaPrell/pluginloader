// AUTHOR: Nick LaPrell (Nick@LaPrell.org)
// PROJECT HOME: http://code.google.com/p/pluginloader/
// LICENSE: MIT - http://www.opensource.org/licenses/mit-license.php  
(function($){jqDEFAULT_PLUGIN_PATH='/plugins/';jqDEFAULT_SCRIPT_PATH='';jqDEFAULT_LIB_PATH='/lib/';jqDEFAULT_CSS_PATH='/plugins/css/';jqDEFAULT_CACHE=true;jqDEFAULT_ASYNC=null;jqLoaded={plugins:['pluginLoader'],scripts:[],libs:[],css:[]};$.loadPlugins=function(a){a=setParams(a);a.path=typeof a.path=='undefined'?jqDEFAULT_PLUGIN_PATH:a.path;$.loadJS(a,'plugins')};$.loadScripts=function(a){a=setParams(a);a.path=typeof a.path=='undefined'?jqDEFAULT_SCRIPT_PATH:a.path;$.loadJS(a,'scripts')};$.loadLibs=function(a){a=setParams(a);a.path=typeof a.path=='undefined'?jqDEFAULT_LIB_PATH:a.path;$.loadJS(a,'libs')};$.loadJS=function(a,b){var c=$.ajaxSettings.async;a.list=a.list instanceof Array===false?[a.list]:a.list;a.cache=typeof a.cache=='undefined'?jqDEFAULT_CACHE:a.cache;a.async=typeof a.async=='undefined'?jqDEFAULT_ASYNC===null?c:jqDEFAULT_ASYNC:a.async;$.ajaxSetup({async:a.async});for(var i=0;i<a.list.length;++i){if(!inArray(a.list[i],jqLoaded[b])){var d=a.path+"jquery."+a.list[i]+".js";d+=a.cache?'':"?"+Math.random();$.getScript(d);jqLoaded[b].push(a.list[i])}}$.ajaxSetup({async:c})};$.loadCSS=function(a){a=setParams(a);a.list=a.list instanceof Array===false?[a.list]:a.list;a.cache=typeof a.cache=='undefined'?jqDEFAULT_CACHE:a.cache;a.path=typeof a.path=='undefined'?jqDEFAULT_CSS_PATH:a.path;var b='';for(var i=0;i<a.list.length;++i){if(!inArray(a.list[i],jqLoaded.css)){jqLoaded.css.push(a.list[i]);b+='<link type="text/css" href="'+a.path+'jquery.'+a.list[i]+'.css';b+=a.cache?'':'?'+Math.random();b+='" rel="Stylesheet" />'}}$(document).ready(function(){$("head").append(b)})}})(jQuery);function inArray(a,b){for(var i=0;i<b.length;++i){if(a==b[i]){return true}}return false}function setParams(a){var p={};if(a instanceof Object){p=a}else{p.list=a}return p}