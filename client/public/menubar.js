
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
	window.location.href = "/restaurant_review_dev/";
});

$("#restaurant_page").click(()=>{
	window.location.href = "/restaurant_review_dev/restaurant_pg";
});

$("#user_page").click(()=>{
	window.location.href = "/restaurant_review_dev/user_pg";
});

$("#visit_page").click(()=>{
	window.location.href = "/restaurant_review_dev/visit_pg";
});

$("#user_visit_page").click(()=>{
	window.location.href = "/restaurant_review_dev/user_visit_pg";
});

$("#restaurant_review_page").click(()=>{
	window.location.href = "/restaurant_review_dev/restaurant_review_pg";
});

$("#menu_item_page").click(()=>{
	window.location.href = "/restaurant_review_dev/menu_item_pg";
});

$("#menu_item_review_page").click(()=>{
	window.location.href = "/restaurant_review_dev/menu_item_review_pg";
});

$("#cuisine_page").click(()=>{
	window.location.href = "/restaurant_review_dev/cuisine_pg";
});

$("#restaurant_cuisine_page").click(()=>{
	window.location.href = "/restaurant_review_dev/restaurant_cuisine_pg";
});