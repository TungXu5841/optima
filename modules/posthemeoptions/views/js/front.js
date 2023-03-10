/**
* 2007-2021 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author    PrestaShop SA <contact@prestashop.com>
*  @copyright 2007-2021 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*
* Don't forget to prefix your containers with your own identifier
* to avoid any conflicts with others containers.
*/

/*
 * Countdown JS
 */
!function(){var t=!1;window.JQClass=function(){},JQClass.classes={},JQClass.extend=function e(n){var a=this.prototype;t=!0;var s=new this;for(var i in t=!1,n)s[i]="function"==typeof n[i]&&"function"==typeof a[i]?function(t,e){return function(){var n=this._super;this._super=function(e){return a[t].apply(this,e)};var s=e.apply(this,arguments);return this._super=n,s}}(i,n[i]):n[i];function r(){!t&&this._init&&this._init.apply(this,arguments)}return r.prototype=s,r.prototype.constructor=r,r.extend=e,r}}(),function($){function camelCase(t){return t.replace(/-([a-z])/g,function(t,e){return e.toUpperCase()})}JQClass.classes.JQPlugin=JQClass.extend({name:"plugin",defaultOptions:{},regionalOptions:{},_getters:[],_getMarker:function(){return"is-"+this.name},_init:function(){$.extend(this.defaultOptions,this.regionalOptions&&this.regionalOptions[""]||{});var t=camelCase(this.name);$[t]=this,$.fn[t]=function(e){var n=Array.prototype.slice.call(arguments,1);return $[t]._isNotChained(e,n)?$[t][e].apply($[t],[this[0]].concat(n)):this.each(function(){if("string"==typeof e){if("_"===e[0]||!$[t][e])throw"Unknown method: "+e;$[t][e].apply($[t],[this].concat(n))}else $[t]._attach(this,e)})}},setDefaults:function(t){$.extend(this.defaultOptions,t||{})},_isNotChained:function(t,e){return"option"===t&&(0===e.length||1===e.length&&"string"==typeof e[0])||$.inArray(t,this._getters)>-1},_attach:function(t,e){if(!(t=$(t)).hasClass(this._getMarker())){t.addClass(this._getMarker()),e=$.extend({},this.defaultOptions,this._getMetadata(t),e||{});var n=$.extend({name:this.name,elem:t,options:e},this._instSettings(t,e));t.data(this.name,n),this._postAttach(t,n),this.option(t,e)}},_instSettings:function(t,e){return{}},_postAttach:function(t,e){},_getMetadata:function(elem){try{var data=elem.data(this.name.toLowerCase())||"";for(var name in data=data.replace(/'/g,'"'),data=data.replace(/([a-zA-Z0-9]+):/g,function(t,e,n){var a=data.substring(0,n).match(/"/g);return a&&a.length%2!=0?e+":":'"'+e+'":'}),data=$.parseJSON("{"+data+"}"),data){var value=data[name];"string"==typeof value&&value.match(/^new Date\((.*)\)$/)&&(data[name]=eval(value))}return data}catch(t){return{}}},_getInst:function(t){return $(t).data(this.name)||{}},option:function(t,e,n){var a=(t=$(t)).data(this.name);if(!e||"string"==typeof e&&null==n)return(s=(a||{}).options)&&e?s[e]:s;if(t.hasClass(this._getMarker())){var s=e||{};"string"==typeof e&&((s={})[e]=n),this._optionsChanged(t,a,s),$.extend(a.options,s)}},_optionsChanged:function(t,e,n){},destroy:function(t){(t=$(t)).hasClass(this._getMarker())&&(this._preDestroy(t,this._getInst(t)),t.removeData(this.name).removeClass(this._getMarker()))},_preDestroy:function(t,e){}}),$.JQPlugin={createPlugin:function(t,e){"object"==typeof t&&(e=t,t="JQPlugin"),t=camelCase(t);var n=camelCase(e.name);JQClass.classes[n]=JQClass.classes[t].extend(e),new JQClass.classes[n]}}}(jQuery);

!function(a){"use strict";var b="countdown",c=0,d=1,e=2,f=3,g=4,h=5,i=6;a.JQPlugin.createPlugin({name:b,defaultOptions:{until:null,since:null,timezone:null,serverSync:null,format:"dHMS",layout:"",compact:!1,padZeroes:!1,significant:0,description:"",expiryUrl:"",expiryText:"",alwaysExpire:!1,onExpiry:null,onTick:null,tickInterval:1},regionalOptions:{"":{labels:["Years","Months","Weeks","Days","Hours","Minutes","Seconds"],labels1:["Year","Month","Week","Day","Hour","Minute","Second"],compactLabels:["y","m","w","d"],whichLabels:null,digits:["0","1","2","3","4","5","6","7","8","9"],timeSeparator:":",isRTL:!1}},_rtlClass:b+"-rtl",_sectionClass:b+"-section",_amountClass:b+"-amount",_periodClass:b+"-period",_rowClass:b+"-row",_holdingClass:b+"-holding",_showClass:b+"-show",_descrClass:b+"-descr",_timerElems:[],_init:function(){function b(a){var h=a<1e12?e?window.performance.now()+window.performance.timing.navigationStart:d():a||d();h-g>=1e3&&(c._updateElems(),g=h),f(b)}var c=this;this._super(),this._serverSyncs=[];var d="function"==typeof Date.now?Date.now:function(){return(new Date).getTime()},e=window.performance&&"function"==typeof window.performance.now,f=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||null,g=0;!f||a.noRequestAnimationFrame?(a.noRequestAnimationFrame=null,a.countdown._timer=setInterval(function(){c._updateElems()},1e3)):(g=window.animationStartTime||window.webkitAnimationStartTime||window.mozAnimationStartTime||window.oAnimationStartTime||window.msAnimationStartTime||d(),f(b))},UTCDate:function(a,b,c,d,e,f,g,h){"object"==typeof b&&b instanceof Date&&(h=b.getMilliseconds(),g=b.getSeconds(),f=b.getMinutes(),e=b.getHours(),d=b.getDate(),c=b.getMonth(),b=b.getFullYear());var i=new Date;return i.setUTCFullYear(b),i.setUTCDate(1),i.setUTCMonth(c||0),i.setUTCDate(d||1),i.setUTCHours(e||0),i.setUTCMinutes((f||0)-(Math.abs(a)<30?60*a:a)),i.setUTCSeconds(g||0),i.setUTCMilliseconds(h||0),i},periodsToSeconds:function(a){return 31557600*a[0]+2629800*a[1]+604800*a[2]+86400*a[3]+3600*a[4]+60*a[5]+a[6]},resync:function(){var b=this;a("."+this._getMarker()).each(function(){var c=a.data(this,b.name);if(c.options.serverSync){for(var d=null,e=0;e<b._serverSyncs.length;e++)if(b._serverSyncs[e][0]===c.options.serverSync){d=b._serverSyncs[e];break}if(b._eqNull(d[2])){var f=a.isFunction(c.options.serverSync)?c.options.serverSync.apply(this,[]):null;d[2]=(f?(new Date).getTime()-f.getTime():0)-d[1]}c._since&&c._since.setMilliseconds(c._since.getMilliseconds()+d[2]),c._until.setMilliseconds(c._until.getMilliseconds()+d[2])}});for(var c=0;c<b._serverSyncs.length;c++)b._eqNull(b._serverSyncs[c][2])||(b._serverSyncs[c][1]+=b._serverSyncs[c][2],delete b._serverSyncs[c][2])},_instSettings:function(a,b){return{_periods:[0,0,0,0,0,0,0]}},_addElem:function(a){this._hasElem(a)||this._timerElems.push(a)},_hasElem:function(b){return a.inArray(b,this._timerElems)>-1},_removeElem:function(b){this._timerElems=a.map(this._timerElems,function(a){return a===b?null:a})},_updateElems:function(){for(var a=this._timerElems.length-1;a>=0;a--)this._updateCountdown(this._timerElems[a])},_optionsChanged:function(b,c,d){d.layout&&(d.layout=d.layout.replace(/&lt;/g,"<").replace(/&gt;/g,">")),this._resetExtraLabels(c.options,d);var e=c.options.timezone!==d.timezone;a.extend(c.options,d),this._adjustSettings(b,c,!this._eqNull(d.until)||!this._eqNull(d.since)||e);var f=new Date;(c._since&&c._since<f||c._until&&c._until>f)&&this._addElem(b[0]),this._updateCountdown(b,c)},_updateCountdown:function(b,c){if(b=b.jquery?b:a(b),c=c||this._getInst(b)){if(b.html(this._generateHTML(c)).toggleClass(this._rtlClass,c.options.isRTL),"pause"!==c._hold&&a.isFunction(c.options.onTick)){var d="lap"!==c._hold?c._periods:this._calculatePeriods(c,c._show,c.options.significant,new Date);1!==c.options.tickInterval&&this.periodsToSeconds(d)%c.options.tickInterval!==0||c.options.onTick.apply(b[0],[d])}var e="pause"!==c._hold&&(c._since?c._now.getTime()<c._since.getTime():c._now.getTime()>=c._until.getTime());if(e&&!c._expiring){if(c._expiring=!0,this._hasElem(b[0])||c.options.alwaysExpire){if(this._removeElem(b[0]),a.isFunction(c.options.onExpiry)&&c.options.onExpiry.apply(b[0],[]),c.options.expiryText){var f=c.options.layout;c.options.layout=c.options.expiryText,this._updateCountdown(b[0],c),c.options.layout=f}c.options.expiryUrl&&(window.location=c.options.expiryUrl)}c._expiring=!1}else"pause"===c._hold&&this._removeElem(b[0])}},_resetExtraLabels:function(a,b){var c=null;for(c in b)c.match(/[Ll]abels[02-9]|compactLabels1/)&&(a[c]=b[c]);for(c in a)c.match(/[Ll]abels[02-9]|compactLabels1/)&&"undefined"==typeof b[c]&&(a[c]=null)},_eqNull:function(a){return"undefined"==typeof a||null===a},_adjustSettings:function(b,c,d){for(var e=null,f=0;f<this._serverSyncs.length;f++)if(this._serverSyncs[f][0]===c.options.serverSync){e=this._serverSyncs[f][1];break}var g=null,h=null;if(this._eqNull(e)){var i=a.isFunction(c.options.serverSync)?c.options.serverSync.apply(b[0],[]):null;g=new Date,h=i?g.getTime()-i.getTime():0,this._serverSyncs.push([c.options.serverSync,h])}else g=new Date,h=c.options.serverSync?e:0;var j=c.options.timezone;j=this._eqNull(j)?-g.getTimezoneOffset():j,(d||!d&&this._eqNull(c._until)&&this._eqNull(c._since))&&(c._since=c.options.since,this._eqNull(c._since)||(c._since=this.UTCDate(j,this._determineTime(c._since,null)),c._since&&h&&c._since.setMilliseconds(c._since.getMilliseconds()+h)),c._until=this.UTCDate(j,this._determineTime(c.options.until,g)),h&&c._until.setMilliseconds(c._until.getMilliseconds()+h)),c._show=this._determineShow(c)},_preDestroy:function(a,b){this._removeElem(a[0]),a.empty()},pause:function(a){this._hold(a,"pause")},lap:function(a){this._hold(a,"lap")},resume:function(a){this._hold(a,null)},toggle:function(b){var c=a.data(b,this.name)||{};this[c._hold?"resume":"pause"](b)},toggleLap:function(b){var c=a.data(b,this.name)||{};this[c._hold?"resume":"lap"](b)},_hold:function(b,c){var d=a.data(b,this.name);if(d){if("pause"===d._hold&&!c){d._periods=d._savePeriods;var e=d._since?"-":"+";d[d._since?"_since":"_until"]=this._determineTime(e+d._periods[0]+"y"+e+d._periods[1]+"o"+e+d._periods[2]+"w"+e+d._periods[3]+"d"+e+d._periods[4]+"h"+e+d._periods[5]+"m"+e+d._periods[6]+"s"),this._addElem(b)}d._hold=c,d._savePeriods="pause"===c?d._periods:null,a.data(b,this.name,d),this._updateCountdown(b,d)}},getTimes:function(b){var c=a.data(b,this.name);return c?"pause"===c._hold?c._savePeriods:c._hold?this._calculatePeriods(c,c._show,c.options.significant,new Date):c._periods:null},_determineTime:function(a,b){var c=this,d=function(a){var b=new Date;return b.setTime(b.getTime()+1e3*a),b},e=function(a){a=a.toLowerCase();for(var b=new Date,d=b.getFullYear(),e=b.getMonth(),f=b.getDate(),g=b.getHours(),h=b.getMinutes(),i=b.getSeconds(),j=/([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g,k=j.exec(a);k;){switch(k[2]||"s"){case"s":i+=parseInt(k[1],10);break;case"m":h+=parseInt(k[1],10);break;case"h":g+=parseInt(k[1],10);break;case"d":f+=parseInt(k[1],10);break;case"w":f+=7*parseInt(k[1],10);break;case"o":e+=parseInt(k[1],10),f=Math.min(f,c._getDaysInMonth(d,e));break;case"y":d+=parseInt(k[1],10),f=Math.min(f,c._getDaysInMonth(d,e))}k=j.exec(a)}return new Date(d,e,f,g,h,i,0)},f=this._eqNull(a)?b:"string"==typeof a?e(a):"number"==typeof a?d(a):a;return f&&f.setMilliseconds(0),f},_getDaysInMonth:function(a,b){return 32-new Date(a,b,32).getDate()},_normalLabels:function(a){return a},_generateHTML:function(b){var j=this;b._periods=b._hold?b._periods:this._calculatePeriods(b,b._show,b.options.significant,new Date);var k=!1,l=0,m=b.options.significant,n=a.extend({},b._show),o=null;for(o=c;o<=i;o++)k=k||"?"===b._show[o]&&b._periods[o]>0,n[o]="?"!==b._show[o]||k?b._show[o]:null,l+=n[o]?1:0,m-=b._periods[o]>0?1:0;var p=[!1,!1,!1,!1,!1,!1,!1];for(o=i;o>=c;o--)b._show[o]&&(b._periods[o]?p[o]=!0:(p[o]=m>0,m--));var q=b.options.compact?b.options.compactLabels:b.options.labels,r=b.options.whichLabels||this._normalLabels,s=function(a){var c=b.options["compactLabels"+r(b._periods[a])];return n[a]?j._translateDigits(b,b._periods[a])+(c?c[a]:q[a])+" ":""},t=b.options.padZeroes?2:1,u=function(a){var c=b.options["labels"+r(b._periods[a])];return!b.options.significant&&n[a]||b.options.significant&&p[a]?'<span class="'+j._sectionClass+'"><span class="'+j._amountClass+'">'+j._minDigits(b,b._periods[a],t)+'</span><span class="'+j._periodClass+'">'+(c?c[a]:q[a])+"</span></span>":""};return b.options.layout?this._buildLayout(b,n,b.options.layout,b.options.compact,b.options.significant,p):(b.options.compact?'<span class="'+this._rowClass+" "+this._amountClass+(b._hold?" "+this._holdingClass:"")+'">'+s(c)+s(d)+s(e)+s(f)+(n[g]?this._minDigits(b,b._periods[g],2):"")+(n[h]?(n[g]?b.options.timeSeparator:"")+this._minDigits(b,b._periods[h],2):"")+(n[i]?(n[g]||n[h]?b.options.timeSeparator:"")+this._minDigits(b,b._periods[i],2):""):'<span class="'+this._rowClass+" "+this._showClass+(b.options.significant||l)+(b._hold?" "+this._holdingClass:"")+'">'+u(c)+u(d)+u(e)+u(f)+u(g)+u(h)+u(i))+"</span>"+(b.options.description?'<span class="'+this._rowClass+" "+this._descrClass+'">'+b.options.description+"</span>":"")},_buildLayout:function(b,j,k,l,m,n){for(var o=b.options[l?"compactLabels":"labels"],p=b.options.whichLabels||this._normalLabels,q=function(a){return(b.options[(l?"compactLabels":"labels")+p(b._periods[a])]||o)[a]},r=function(a,c){return b.options.digits[Math.floor(a/c)%10]},s={desc:b.options.description,sep:b.options.timeSeparator,yl:q(c),yn:this._minDigits(b,b._periods[c],1),ynn:this._minDigits(b,b._periods[c],2),ynnn:this._minDigits(b,b._periods[c],3),y1:r(b._periods[c],1),y10:r(b._periods[c],10),y100:r(b._periods[c],100),y1000:r(b._periods[c],1e3),ol:q(d),on:this._minDigits(b,b._periods[d],1),onn:this._minDigits(b,b._periods[d],2),onnn:this._minDigits(b,b._periods[d],3),o1:r(b._periods[d],1),o10:r(b._periods[d],10),o100:r(b._periods[d],100),o1000:r(b._periods[d],1e3),wl:q(e),wn:this._minDigits(b,b._periods[e],1),wnn:this._minDigits(b,b._periods[e],2),wnnn:this._minDigits(b,b._periods[e],3),w1:r(b._periods[e],1),w10:r(b._periods[e],10),w100:r(b._periods[e],100),w1000:r(b._periods[e],1e3),dl:q(f),dn:this._minDigits(b,b._periods[f],1),dnn:this._minDigits(b,b._periods[f],2),dnnn:this._minDigits(b,b._periods[f],3),d1:r(b._periods[f],1),d10:r(b._periods[f],10),d100:r(b._periods[f],100),d1000:r(b._periods[f],1e3),hl:q(g),hn:this._minDigits(b,b._periods[g],1),hnn:this._minDigits(b,b._periods[g],2),hnnn:this._minDigits(b,b._periods[g],3),h1:r(b._periods[g],1),h10:r(b._periods[g],10),h100:r(b._periods[g],100),h1000:r(b._periods[g],1e3),ml:q(h),mn:this._minDigits(b,b._periods[h],1),mnn:this._minDigits(b,b._periods[h],2),mnnn:this._minDigits(b,b._periods[h],3),m1:r(b._periods[h],1),m10:r(b._periods[h],10),m100:r(b._periods[h],100),m1000:r(b._periods[h],1e3),sl:q(i),sn:this._minDigits(b,b._periods[i],1),snn:this._minDigits(b,b._periods[i],2),snnn:this._minDigits(b,b._periods[i],3),s1:r(b._periods[i],1),s10:r(b._periods[i],10),s100:r(b._periods[i],100),s1000:r(b._periods[i],1e3)},t=k,u=c;u<=i;u++){var v="yowdhms".charAt(u),w=new RegExp("\\{"+v+"<\\}([\\s\\S]*)\\{"+v+">\\}","g");t=t.replace(w,!m&&j[u]||m&&n[u]?"$1":"")}return a.each(s,function(a,b){var c=new RegExp("\\{"+a+"\\}","g");t=t.replace(c,b)}),t},_minDigits:function(a,b,c){return b=""+b,b.length>=c?this._translateDigits(a,b):(b="0000000000"+b,this._translateDigits(a,b.substr(b.length-c)))},_translateDigits:function(a,b){return(""+b).replace(/[0-9]/g,function(b){return a.options.digits[b]})},_determineShow:function(a){var b=a.options.format,j=[];return j[c]=b.match("y")?"?":b.match("Y")?"!":null,j[d]=b.match("o")?"?":b.match("O")?"!":null,j[e]=b.match("w")?"?":b.match("W")?"!":null,j[f]=b.match("d")?"?":b.match("D")?"!":null,j[g]=b.match("h")?"?":b.match("H")?"!":null,j[h]=b.match("m")?"?":b.match("M")?"!":null,j[i]=b.match("s")?"?":b.match("S")?"!":null,j},_calculatePeriods:function(a,b,j,k){a._now=k,a._now.setMilliseconds(0);var l=new Date(a._now.getTime());a._since?k.getTime()<a._since.getTime()?a._now=k=l:k=a._since:(l.setTime(a._until.getTime()),k.getTime()>a._until.getTime()&&(a._now=k=l));var m=[0,0,0,0,0,0,0];if(b[c]||b[d]){var n=this._getDaysInMonth(k.getFullYear(),k.getMonth()),o=this._getDaysInMonth(l.getFullYear(),l.getMonth()),p=l.getDate()===k.getDate()||l.getDate()>=Math.min(n,o)&&k.getDate()>=Math.min(n,o),q=function(a){return 60*(60*a.getHours()+a.getMinutes())+a.getSeconds()},r=Math.max(0,12*(l.getFullYear()-k.getFullYear())+l.getMonth()-k.getMonth()+(l.getDate()<k.getDate()&&!p||p&&q(l)<q(k)?-1:0));m[c]=b[c]?Math.floor(r/12):0,m[d]=b[d]?r-12*m[c]:0,k=new Date(k.getTime());var s=k.getDate()===n,t=this._getDaysInMonth(k.getFullYear()+m[c],k.getMonth()+m[d]);k.getDate()>t&&k.setDate(t),k.setFullYear(k.getFullYear()+m[c]),k.setMonth(k.getMonth()+m[d]),s&&k.setDate(t)}var u=Math.floor((l.getTime()-k.getTime())/1e3),v=null,w=function(a,c){m[a]=b[a]?Math.floor(u/c):0,u-=m[a]*c};if(w(e,604800),w(f,86400),w(g,3600),w(h,60),w(i,1),u>0&&!a._since){var x=[1,12,4.3482,7,24,60,60],y=i,z=1;for(v=i;v>=c;v--)b[v]&&(m[y]>=z&&(m[y]=0,u=1),u>0&&(m[v]++,u=0,y=v,z=1)),z*=x[v]}if(j)for(v=c;v<=i;v++)j&&m[v]?j--:j||(m[v]=0);return m}})}(jQuery);

$(document).ready(function(){
	emailSubscription();
	$('.slick-slider-block').each(function(){
		initSlider($(this));
	});
	$('.elementor-widget-pos_tab_products').each(function(){
		posAjaxTabs($(this));
	})
	
	//Slideshow
	var $myCarousel = $('.pos-slideshow'),
		$firstAnimatingElems = $myCarousel.find('.slideshow-content').find("[data-animation ^= 'animated']");
	//Animate captions in first slide on page load 
	doAnimations($firstAnimatingElems);

	$('.pos-slideshow').on('beforeChange', function(event, slick, currentSlide, nextSlide){
	  	var $myCarousel = $('.pos-slideshow'),
			$firstAnimatingElems = $myCarousel.find('.slideshow-content').find("[data-animation ^= 'animated']");

		//Animate captions in first slide on page load 
		doAnimations($firstAnimatingElems);
	});

	specificPriceCountdown();

	var carousels = [
        'pos_brand.default',
        'pos_products.default',
        'pos_categories.default',
        'pos_tab_products.default',
        'pos_sale_products.default',
        'pos_testimonials.default',
        'pos_slideshow.default',
        'posSearch.default',
        'pos_countdown.default',
        'pos_latestpost.default',
    ];
    (window.top.ceFrontend || window.top.elementorFrontend).hooks.addAction('frontend/element_ready/widget', function($scope, $) {
        var widget = $scope.data('element_type');

        if (~carousels.indexOf(widget)) {
        	specificPriceCountdown();
            var $carousel = $scope.find('.slick-slider-block');
            if (!$carousel.length) {
                return;
            }
            
            
            initSlider($carousel);

            var $firstAnimatingElems = $carousel.find('.slideshow-content').find("[data-animation ^= 'animated']");
			//Animate captions in first slide on page load 
			doAnimations($firstAnimatingElems);
            $carousel.on('beforeChange', function(event, slick, currentSlide, nextSlide){
				var $firstAnimatingElems = $carousel.find('.slideshow-content').find("[data-animation ^= 'animated']");
				//Animate captions in first slide on page load 
				doAnimations($firstAnimatingElems);
			});

        }
    });
   
})

function initSlider($carousel){
	$carousel.on('init', function(event, slick, currentSlide){
		var slideToShow = $(this).find('.slick-active').length - 1;
		$(this).find('.slick-slide').removeClass('first-active').removeClass('last-active');
		$(this).find('.slick-active').eq(0).addClass('first-active');
		$(this).find('.slick-active').eq(slideToShow).addClass('last-active');
	});
	var savedOptions = $carousel.data('slider_options'),
		responsive = $carousel.data('slider_responsive'),
		defaultOptions = {
            rows: 1,
            responsive: [
                {
			      breakpoint: 1536,
			      settings: {
			        slidesToShow: responsive.items_laptop,
			        slidesToScroll: responsive.scroll ? responsive.items_laptop : 1,
					centerMode: false,
			      }
			    },
				{
			      breakpoint: 1200,
			      settings: {
			        slidesToShow: responsive.items_landscape_tablet,
			        slidesToScroll: responsive.scroll ? responsive.items_landscape_tablet : 1,
					centerMode: false,
			      }
			    },
			    {
			      breakpoint: 992,
			      settings: {
			        slidesToShow: responsive.items_portrait_tablet,
			        slidesToScroll: responsive.scroll ? responsive.items_portrait_tablet : 1,
					centerMode: false,
			      }
			    },
			    {
			      breakpoint: 768,
			      settings: {
			        slidesToShow: responsive.items_landscape_mobile,
			        slidesToScroll: responsive.scroll ? responsive.items_landscape_mobile : 1,
					centerMode: false,
			      }
			    },
				{
			      breakpoint: 568,
			      settings: {
			        slidesToShow: responsive.items_portrait_mobile,
			        slidesToScroll: responsive.scroll ? responsive.items_portrait_mobile : 1,
					centerMode: false,
			      }
			    },
			    {
			      breakpoint: 360,
			      settings: {
			        slidesToShow: responsive.items_small_mobile,
			        slidesToScroll: responsive.scroll ? responsive.items_small_mobile : 1,
					centerMode: false,
			      }
			    }
            ]
        };
		console.log(defaultOptions);
		var customOptions = {};
		if(savedOptions.custom_navigation){
			var targetCustomNav = $carousel.next('.slick-custom-navigation');
			if(savedOptions.custom_navigation == 'bottom'){
				customOptions = {
					appendArrows: targetCustomNav,
					appendDots: targetCustomNav,
					prevArrow: "<button class='slick-prev slick-arrow'>Previous</button>",
					nextArrow: "<button class='slick-next slick-arrow'>Next</button>",
				};
			}else{
				customOptions = {
					appendArrows: targetCustomNav.find('.slick-custom-arrows'),
					appendDots: targetCustomNav,
					prevArrow: "<button class='slick-prev slick-arrow'>Previous</button>",
					nextArrow: "<button class='slick-next slick-arrow'>Next</button>",
				};
			}
			
		}
        var slickOptions = $.extend({}, defaultOptions, $carousel.data('slider_options'), customOptions);
		
	$carousel.not('.slick-initialized').slick(slickOptions);
	
	$carousel.on('afterChange', function(event, slick, currentSlide){
		var slideToShow = $(this).find('.slick-active').length - 1;
		$(this).find('.slick-slide').removeClass('first-active').removeClass('last-active');
		$(this).find('.slick-active').eq(0).addClass('first-active');
		$(this).find('.slick-active').eq(slideToShow).addClass('last-active');
	});
	
}
function specificPriceCountdown(){
	$( ".specific-prices-timer" ).each(function( index ) {
		
		var date_y = $(this).attr('data-date-y');
		var date_m = $(this).attr('data-date-m');
		var date_d = $(this).attr('data-date-d');
		var date_h = $(this).attr('data-date-h');
		var date_mi= $(this).attr('data-date-mi');
		var date_s = $(this).attr('data-date-s');

		$(this).countdown({
			until: new Date(date_y,date_m-1,date_d,date_h,date_mi,date_s),
			labels: ['Years', 'Months', 'Weeks', pdays_text, phours_text, pmins_text, psecs_text],
			labels1: ['Year', 'Month', 'Week', pday_text, phour_text, pmin_text, psec_text],
		});

	});
	var end_date = $('.block-countdown').data('end-date');
	$('.block-countdown').countdown({
		until: new Date(end_date),
		labels: ['Years', 'Months', 'Weeks', pdays_text, phours_text, pmins_text, psecs_text],
		labels1: ['Year', 'Month', 'Week', pday_text, phour_text, pmin_text, psec_text],
	})
}
function doAnimations( elems ) {
	//Cache the animationend event in a variable
	var animEndEv = 'webkitAnimationEnd animationend';
	
	elems.each(function () {
		var $this = $(this),
			$animationType = $this.data('animation');
		$this.addClass($animationType).one(animEndEv, function () {
			$this.removeClass($animationType);
		});
	});
}

var emailSubscription = function(){
	$('button.pos-newsletter-button').click(function(e){
        e.preventDefault();
        let form = $(this).closest('.pos-newsletter-form'),
            email_address = form.find('input[name=email]').val();

        
        $.ajax({
            type: 'POST',
            headers: {
                'cache-control': 'no-cache'
            },
            async: false,
            url: pos_subscription,
            dataType: 'json',
            data: {
                email: email_address,
                action: 0
            },
            success: function(data)
            {
                if (data)
                {
                    if (data.nw_error){
                        $('.pos-newsletter-response').html('<div class="alert alert-danger">'+ data.msg +'</div>')
                    }else{
                    	$('.pos-newsletter-response').html('<div class="alert alert-success">'+ data.msg +'</div>')
                    }
                }
            },
        });
        
    });
}

var posAjaxTabs = function(target){
	var tabWidget = target.find('.pos-producttabs-widget'),
		tabTitle = tabWidget.find('.tab-titles'),
		tabContent = tabWidget.find('.tab-content');

	//initSlider(tabWidget.find('.elementor-block-carousel'));	

	var cache = [];	
	if( tabContent.find('.tab-pane').length = 1 ) {
		var first_tab_id = tabTitle.find('.nav-item').eq(0).data('id');
		cache[first_tab_id] = tabContent.find('.tab-pane').html()
	}
	var height = tabContent.find('.tab-pane').eq(0).height();
	tabTitle.find('.nav-item').on('click' , function(e){
		e.preventDefault();
		var $this = $(this),
			idTab = $this.data('id'),
			tabData = $('#tab-pane-' + idTab).data('tab_content');
		console.log(tabData);
		tabTitle.find('.nav-item .nav-link').removeClass('active');
		tabContent.find('.tab-pane').removeClass('active');
		$('#tab-pane-'+ idTab).addClass('active');
		$this.find('.nav-link').addClass('active');

		if(!tabWidget.data('ajax')){
			return;
		}
		
		loadTab(tabData , $this, idTab, tabContent , cache, height, function(data) {
	            if( data ) {
	                tabContent.find('#tab-pane-' + idTab).append(data.html);
	                initSlider($('#tab-pane-'+ idTab).find('.slick-slider-block'));
	            }
		});
		
	});
}
var loadTab = function(tabData, $this, idTab, tabs, cache , height, callback){
	if( cache[idTab] ) {
		return;
	} else {
		tabs.append('<div class="tab-loading" style="height:'+ height +'px"></div>');
	};
	$.ajax({
		url: pos_ajaxtab,
		data: {
			'action': 'tabProducts',
			'tabData' : tabData,
			'idTab' : idTab,
		},
		dataType: 'json',
		method: 'POST',
		success: function(data) {
			cache[idTab] = data;
			callback(data);
		},
		error: function(data) {
			console.log('Ajax error');
		},
		complete: function() {
			tabs.find('.tab-loading').remove();
		},
	});
}

