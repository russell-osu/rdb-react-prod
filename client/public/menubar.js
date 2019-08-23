
//mouseover function for changing menu bar cells
// function checkMouseOver(event) {
// 	if(event.target === this){
// 		event.target.style.background = "#28AFEB";

// 	}
// }

// //mouseleave prevents color change when leaving cell's child elements
// function checkMouseLeave(event) {
// 	if(event.target === this){
// 		event.target.style.background = "#87c466";
// 	}
// }

// var menucells = document.getElementsByClassName("menucell");

// //assign event listener to all items with class "menucell"
// for (var i = 0; i < menucells.length; i++){
// 	menucells[i].addEventListener("mouseover", checkMouseOver);
// 	menucells[i].addEventListener("mouseleave", checkMouseLeave);
// }

$(".menucell").hover(
	function(){$(this).css("background", "#28AFEB");},
	function(){$(this).css("background", "#87c466");}
);


$("#home_page").click(()=>{
	window.location.href = "/";
});

$("#restaurant_page").click(()=>{
	window.location.href = "/restaurant";
});

$("#user_page").click(()=>{
	window.location.href = "/user";
});

$("#visit_page").click(()=>{
	window.location.href = "/visit";
});

$("#user_visit_page").click(()=>{
	window.location.href = "/user_visit";
});

$("#restaurant_review_page").click(()=>{
	window.location.href = "/restaurant_review";
});

$("#menu_item_page").click(()=>{
	window.location.href = "/menu_item";
});

$("#menu_item_review_page").click(()=>{
	window.location.href = "/menu_item_review";
});

$("#cuisine_page").click(()=>{
	window.location.href = "/cuisine";
});

$("#restaurant_cuisine_page").click(()=>{
	window.location.href = "/restaurant_cuisine";
});