// If you're reading this, go to this link -> http://luke.breuer.com/tutorial/javascript-drag-and-drop-tutorial.aspx
// If it wasn't for that document, it would have taken me a couple more hours to implement this!
// Buy the guy who wrote that a beer or 8

(function() {
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = ".drag { position: relative;}"
	document.getElementsByTagName('head')[0].appendChild(css);

	var elements = document.querySelectorAll( 'body *' );
	for (var i = 0; i < elements.length; i++) {
		elements[i].className = " drag";
		if (elements[i].href) {
			elements[i].addEventListener("click", function(e) {
				e.preventDefault();
			}, false);
		}
	}

	var Config = {
		startX:      0,
		startY:      0,
		offsetX:     0,
		offsetY:     0,
		dragElement: undefined,
		oldZIndex:   0
	};

	document.onmousedown = OnMouseDown;
	document.onmouseup = OnMouseUp;

	function OnMouseDown(e) {
		// IE
		e = e || window.event;

		var target = e.target || e.srcElement;

		if ((e.button == 1 && window.event != null || e.button == 0) && 
				target.className.indexOf("drag") > -1) {
			Config.startX = e.clientX;
			Config.startY = e.clientY;
			Config.offsetX = ExtractNumber(target.style.left);
			Config.offsetY = ExtractNumber(target.style.top);
			Config.oldZIndex = target.style.zIndex;
			target.style.zIndex = 10000;
			Config.dragElement = target;
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

		Config.dragElement.style.left = (Config.offsetX + e.clientX - Config.startX) + "px";
		Config.dragElement.style.top = (Config.offsetY + e.clientY - Config.startY) + "px";
	}

	function OnMouseUp(e) {
		if (Config.dragElement === null) { return; }
		Config.dragElement.style.zIndex = Config.oldZIndex;
		document.onmousemove = null;
		document.onselectstart = null;
		Config.dragElement.ondragstart = null;
		Config.dragElement = null;
	}

	function ExtractNumber(value) {
		var n = parseInt(value);
		return n == null || isNaN(n) ? 0 : n;
	}

	function $(id) {
		return document.getElementById(id);
	}
})();