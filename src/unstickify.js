// If you're reading this, go to this link -> http://luke.breuer.com/tutorial/javascript-drag-and-drop-tutorial.aspx
// If it wasn't for that document, it would have taken me a couple more hours to implement this!
// Buy the guy who wrote that a beer or 8

var css = document.createElement("style");
css.type = "text/css";
css.innerHTML = ".drag { position: relative;}"
document.getElementsByTagName('head')[0].appendChild(css);

var elements = document.querySelectorAll( 'body *' );
for (var i = 0; i < elements.length; i++) {
	elements[i].className = " drag";
}

var _startX = 0;
var _startY = 0;
var _offsetX = 0;
var _offsetY = 0;
var _dragElement;
var _oldZIndex = 0;

document.onmousedown = OnMouseDown;
document.onmouseup = OnMouseUp;

function OnMouseDown(e) {
	// IE
	if (e == null) {
		e = window.event;
	}
	var target = e.target != null ? e.target : e.srcElement;

	if ((e.button == 1 && window.event != null || e.button == 0) && 
			target.className.indexOf("drag") > -1) {
		_startX = e.clientX;
		_startY = e.clientY;
		_offsetX = ExtractNumber(target.style.left);
		_offsetY = ExtractNumber(target.style.top);
		_oldZIndex = target.style.zIndex;
		target.style.zIndex = 10000;
		_dragElement = target;
		document.onmousemove = OnMouseMove;
		document.onselectstart = function () { return false; };
		target.ondragstart = function() { return false; };
		return false;
	}
}

function OnMouseMove(e) {
	if (e == null) {
		var e = window.event;
	}

	_dragElement.style.left = (_offsetX + e.clientX - _startX) + "px";
	_dragElement.style.top = (_offsetY + e.clientY - _startY) + "px";
}

function OnMouseUp(e) {
	if (_dragElement != null) {
		_dragElement.style.zIndex = _oldZIndex;
		document.onmousemove = null;
		document.onselectstart = null;
		_dragElement.ondragstart = null;
		_dragElement = null;
	}
}

function ExtractNumber(value) {
	var n = parseInt(value);
	return n == null || isNaN(n) ? 0 : n;
}

function $(id) {
	return document.getElementById(id);
}