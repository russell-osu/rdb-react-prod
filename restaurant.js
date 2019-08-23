
// Code has been inspired by the model code in CS 340 (although altered significantly)

module.exports = function(){
    var express = require('express');
    var router = express.Router();



    function getRestaurant(res, mysql, context, complete){
        mysql.pool.query("SELECT id, name, street_address, city, state, zip FROM restaurant", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.restaurant = results;
            //context.restaurant = results;
            //console.log(JSON.stringify(results));
            complete();
        });
    }


    function getRestaurantNames(res, mysql, context, complete){
        mysql.pool.query("SELECT id, name FROM restaurant ORDER BY name ASC", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.restaurantNames  = results;
            complete();
        });
    }


    function getRestaurantForUpdate(res, mysql, context, id, complete){
        var sql = "SELECT id, name, street_address, city, state, zip FROM restaurant WHERE id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.restaurant = results[0];
            complete();
        });
    }



    /*Display all restaurants. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleterecords.js"]; //,"filterrestaurant.js","searchrestaurant.js"];
        var mysql = req.app.get('mysql');
        getRestaurant(res, mysql, context, complete);
        function complete(){
            callbackCount++; 
            if(callbackCount >= 1){
                console.log(JSON.stringify(context));
                //res.render('restaurant', context);
                res.json(context);
            }

        }
    });


    /*Return all restaurant names (alphabetized) with id for dropdown lists*/

    router.get('/names', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getRestaurantNames(res, mysql, context, complete);
        function complete(){
            callbackCount++; 
            if(callbackCount >= 1){
                console.log(JSON.stringify(context));
                res.json(context);
            }

        }
    });



    /* Adds a restaurant, redirects to the restaurant page after adding */

    router.post('/', function(req, res){
        //console.log(req.body.restaurant)
        console.log(req.body);
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO restaurant (name, street_address, city, state, zip) VALUES (?,?,?,?,?)";
        //var inserts = [req.body.rest_name, req.body.street_address, req.body.city, req.body.state, req.body.zip];
        var inserts = [req.body.name, req.body.street_address, req.body.city, req.body.state, req.body.zip];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                //res.redirect('/restaurant');
                //res.json("OK");
                res.status(201).end();
            }
        });
    });


    /* Route to delete a restaurant. Simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM restaurant WHERE id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.json("OK");
            }
        })
    })


    /* Display one restaurant for updating */

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updaterecords.js"];
        var mysql = req.app.get('mysql');
        getRestaurantForUpdate(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('restaurant_update', context);
            }

        }
    });


   /* The URI that update data is sent to in order to update a restaurant */

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        //console.log(req.body)
        //console.log(req.params.id)
        var sql = "UPDATE restaurant SET name=?, street_address=?, city=?, state=?, zip=? WHERE id=?";
        var inserts = [req.body.rest_name, req.body.street_address, req.body.city, req.body.state, req.body.zip, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });




    return router;
}();
