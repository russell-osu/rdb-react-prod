
//mouseover function for changing menu bar cells
function checkMouseOver(event) {
	if(event.target === this){
		event.target.style.background = "#28AFEB";

	}
}

//mouseleave prevents color change when leaving cell's child elements
function checkMouseLeave(event) {
	if(event.target === this){
		event.target.style.background = "#87c466";
	}
}

var menucells = document.getElementsByClassName("menucell");

//assign event listener to all items with class "menucell"
for (var i = 0; i < menucells.length; i++){
	menucells[i].addEventListener("mouseover", checkMouseOver);
	menucells[i].addEventListener("mouseleave", checkMouseLeave);
}

