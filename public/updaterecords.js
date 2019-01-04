function updateRestaurant(id){
    $.ajax({
        url: '/restaurant/' + id,
        type: 'PUT',
        data: $('#update-restaurant').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};