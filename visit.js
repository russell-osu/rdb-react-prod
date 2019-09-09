// Code has been inspired by the model code in CS 340 (although altered significantly)

module.exports = function(){
    var express = require('express');
    var router = express.Router();
    

    // function getRestaurant(res, mysql, context, complete){
    //     mysql.pool.query("SELECT id, name FROM restaurant ORDER BY name ASC", function(error, results, fields){
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.restaurant  = results;
    //         complete();
    //     });
    // }


    function getVisit(res, mysql, context, complete){
        mysql.pool.query("SELECT V.id, R.name AS restaurant_name, DATE_FORMAT(V.visit_date, '%m/%d/%y') \
                            AS visit_date, FORMAT(V.price, 2), V.meal_type FROM visit V \
                            INNER JOIN restaurant R ON R.id = V.restaurant_id ORDER BY R.name ASC", 
            function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.visit = results;
                complete();
            });
    }


    /*Display all visits. Requires web based javascript to delete with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleterecords.js"];
        var mysql = req.app.get('mysql');
        getVisit(res, mysql, context, complete);
        //getRestaurant(res, mysql, context, complete);
        function complete(){
            callbackCount++; 
            if(callbackCount >= 1){
                //res.render('visit', context);
                res.json(context);
            }

        }
    });


    /* Adds a visit, redirects to the visit page after adding */

    router.post('/', function(req, res){
        //console.log(req.body.menu_item)
        //console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO visit (restaurant_id, visit_date, price, meal_type) VALUES (?,?,?,?)";
        var inserts = [req.body.restaurant_id, req.body.visit_date, req.body.price, req.body.meal_type];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                //res.redirect('/visit');
                res.status(201).end();
            }
        });
    });


    /* Route to delete a visit, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM visit WHERE id = ?";
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
