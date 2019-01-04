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


    function getMenuItem(res, mysql, context, complete){
        mysql.pool.query("SELECT MI.id, MI.name, R.name AS restaurant_name, MI.price, MI.description \
                            FROM menu_item MI INNER JOIN restaurant R ON R.id = MI.restaurant_id", 
            function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.menu_item = results;
                complete();
            });
    }


    /*Display all menu items. Requires web based javascript to delete with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleterecords.js"];
        var mysql = req.app.get('mysql');
        getMenuItem(res, mysql, context, complete);
        getRestaurant(res, mysql, context, complete);
        function complete(){
            callbackCount++; 
            if(callbackCount >= 2){
                res.render('menu_item', context);
            }

        }
    });


    /* Adds a menu item, redirects to the menu item page after adding */

    router.post('/', function(req, res){
        //console.log(req.body.menu_item)
        //console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO menu_item (name, restaurant_id, price, description) VALUES (?,?,?,?)";
        var inserts = [req.body.MI_name, req.body.restaurant_id, req.body.price, req.body.description];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/menu_item');
            }
        });
    });


    /* Route to delete a person, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM menu_item WHERE id = ?";
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
