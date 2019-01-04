// Code has been inspired by the model code in CS 340 (although altered significantly)

function deleteRestaurant(id){
    $.ajax({
        url: '/restaurant/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};


function deleteCuisine(id){
    $.ajax({
        url: '/cuisine/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};


function deleteMenuItem(id){
    $.ajax({
        url: '/menu_item/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deleteMenuItemReview(id){
    $.ajax({
        url: '/menu_item_review/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};


function deleteUser(id){
    $.ajax({
        url: '/user/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};


function deleteVisit(id){
    $.ajax({
        url: '/visit/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};


function deleteRestaurantReview(id){
    $.ajax({
        url: '/restaurant_review/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};


function deleteUserVisit(uid, vid){
  $.ajax({
      url: '/user_visit/uid/' + uid + '/vid/' + vid,
      type: 'DELETE',
      success: function(result){
          if(result.responseText != undefined){
            alert(result.responseText)
          }
          else {
            window.location.reload(true)
          } 
      }
  })
};



function deleteRestaurantCuisine(rid, cid){
  $.ajax({
      url: '/restaurant_cuisine/rid/' + rid + '/cid/' + cid,
      type: 'DELETE',
      success: function(result){
          if(result.responseText != undefined){
            alert(result.responseText)
          }
          else {
            window.location.reload(true)
          } 
      }
  })
};
