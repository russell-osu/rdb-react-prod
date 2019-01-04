// Code has been inspired by the model code in CS 340 (although altered significantly)

function filterRestaurantReviewsByRestaurant() {
    //get the id of the selected restaurant from the filter dropdown
    var restaurant_id = document.getElementById('restaurant_review_filter').value;
    //construct the URL and redirect to it
    if (restaurant_id === "all_restaurants")
    {
    	window.location = '/restaurant_review';
    }
    else
    {
   	 	window.location = '/restaurant_review/filter/' + parseInt(restaurant_id);
	}
}


