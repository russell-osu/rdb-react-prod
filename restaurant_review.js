// Code has been inspired by the model code in CS 340 (although altered significantly)

module.exports = function(){
    var express = require('express');
    var router = express.Router();
    

    function getRestaurant(res, mysql, context, complete){
        mysql.pool.query("SELECT id, name FROM restaurant ORDER BY name ASC", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.restaurant  = results;
            complete();
        });
    }


    function getUser(res, mysql, context, complete){
        mysql.pool.query("SELECT id, fname, lname FROM user ORDER BY lname ASC", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.user  = results;
            complete();
        });
    }

    function getVisit(res, mysql, context, complete){
        mysql.pool.query("SELECT V.id, DATE_FORMAT(V.visit_date, '%m/%d/%y') AS visit_date, R.name AS restaurant_name FROM visit V INNER JOIN restaurant R ON R.id = V.restaurant_id ORDER BY V.visit_date ASC", 
                function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.visit = results;
            complete();
        });
    }



    function getRestaurantReview(res, mysql, context, complete){
        mysql.pool.query("SELECT RR.id, R.name AS restaurant_name, U.fname, U.lname, DATE_FORMAT(V.visit_date, '%m/%d/%y') \
                            AS visit_date, RR.review FROM restaurant_review RR \
                            LEFT JOIN visit V on V.id = RR.visit_id \
                            LEFT JOIN user U ON U.id = RR.user_id \
                            INNER JOIN restaurant R ON R.id = RR.restaurant_id \
                            ORDER BY R.name ASC",
                            
            function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.restaurant_review = results;
                complete();
            });
    }



    function getRestaurantReviewByRestaurant(req, res, mysql, context, complete){
      var query = "SELECT RR.id, R.name AS restaurant_name, U.fname, U.lname, DATE_FORMAT(V.visit_date, '%m/%d/%y') \
                        AS visit_date, RR.review FROM restaurant_review RR \
                        LEFT JOIN visit V on V.id = RR.visit_id \
                        LEFT JOIN user U ON U.id = RR.user_id \
                        INNER JOIN restaurant R ON R.id = RR.restaurant_id \
                        WHERE R.id = ?";
      //console.log(req.params)
      var inserts = [req.params.rid]
      mysql.pool.query(query, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.restaurant_review = results;
            complete();
        });
    }



    /*Display all restaurant reviews. Requires web based javascript to delete with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleterecords.js","filterrecords.js"];
        var mysql = req.app.get('mysql');
        getRestaurantReview(res, mysql, context, complete);
        //getRestaurant(res, mysql, context, complete);
        //getUser(res, mysql, context, complete);
        //getVisit(res, mysql, context, complete);
        function complete(){
            callbackCount++; 
            if(callbackCount >= 1){
                //res.render('restaurant_review', context);
                res.json(context);
            }

        }
    });


    /*Display all reviews from a given restaurant. Requires web based javascript to delete users with AJAX*/
    router.get('/filter/:rid', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleterecords.js","filterrecords.js"];
        var mysql = req.app.get('mysql');
        getRestaurantReviewByRestaurant(req,res, mysql, context, complete);
        getRestaurant(res, mysql, context, complete);
        getUser(res, mysql, context, complete);
        getVisit(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 4){
                res.render('restaurant_review', context);
            }

        }
    });


    /* Adds a restaurant_review, redirects to the restaurant_review page after adding */

    router.post('/', function(req, res){
        //console.log(req.body.menu_item)
        //console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO restaurant_review (restaurant_id, user_id, review, visit_id) VALUES (?,?,?,?)";
        var inserts = [req.body.restaurant_id, req.body.user_id, req.body.review, req.body.visit_id];

        //if no visit associated with review, change visit_id from 'NULL' to null to ensure compliance with
        //sql syntax    
        if (inserts[3] === "NULL"){
            inserts[3] = null;
        }

        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/restaurant_review');
            }
        });
    });


    /* Route to delete a restaurant review, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM restaurant_review WHERE id = ?";
        var inserts = [req.params.id];
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
