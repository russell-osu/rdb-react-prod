// Code has been inspired by the model code in CS 340 (although altered significantly)

module.exports = function(){
    var express = require('express');
    var router = express.Router();
    

    function getRestaurant(res, mysql, context, complete){
        mysql.pool.query("SELECT id, name AS restaurant_name FROM restaurant ORDER BY name ASC", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.restaurant = results;
            complete();
        });
    }

    function getCuisine(res, mysql, context, complete){
        mysql.pool.query("SELECT id, name AS cuisine_name FROM cuisine ORDER BY name ASC", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.cuisine = results;
            complete();
        });
    }


    function getRestaurantCuisine(res, mysql, context, complete){
        mysql.pool.query("SELECT R.name AS restaurant_name, C.name AS cuisine_name, \
                            RC.restaurant_id, RC.cuisine_id FROM restaurant_cuisine RC \
                            INNER JOIN restaurant R ON R.id = RC.restaurant_id \
                            INNER JOIN cuisine C ON C.id = RC.cuisine_id \
                            ORDER BY R.name ASC", 
            function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.restaurant_cuisine = results;
                complete();
            });
    }


    /*Display all restaurant_cuisine associations. Requires web based javascript to delete with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleterecords.js"]; //,"filterrestaurant_review.js","searchrestaurant_review.js"];
        var mysql = req.app.get('mysql');
        getRestaurantCuisine(res, mysql, context, complete);
        getRestaurant(res, mysql, context, complete);
        getCuisine(res, mysql, context, complete);
        function complete(){
            callbackCount++; 
            if(callbackCount >= 3){
                res.render('restaurant_cuisine', context);
            }

        }
    });


    /* Adds a restaurant_cuisine association, redirects to the restaurant_cuisine page after adding */

    router.post('/', function(req, res){
        //console.log(req.body.menu_item)
        //console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO restaurant_cuisine (restaurant_id, cuisine_id) VALUES (?,?)";
        var inserts = [req.body.restaurant_id, req.body.cuisine_id];


        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/restaurant_cuisine');
            }
        });
    });


    /* Delete a restaurant's cuisine record */
    /* This route will accept a HTTP DELETE request in the form
     * /rid/{{rid}}/cid/{{cid}} -- which is sent by the AJAX form 
     */
    router.delete('/rid/:rid/cid/:cid', function(req, res){
        //console.log(req)
        // console.log(req.params.rid)
        // console.log(req.params.cid)
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM restaurant_cuisine WHERE restaurant_id = ? AND cuisine_id = ?";
        var inserts = [req.params.rid, req.params.cid];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400); 
                res.end(); 
            }else{
                res.status(202).end();
            }
        })
    })





    return router;
}();
