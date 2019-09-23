// Code has been inspired by the model code in CS 340 (although altered significantly)

module.exports = function(){
    var express = require('express');
    var router = express.Router();



    function getMenuItem(res, mysql, context, complete){
        mysql.pool.query("SELECT MI.id, R.name AS restaurant_name, MI.name AS menu_item_name, FORMAT(MI.price, 2) AS price, MI.description \
                            FROM menu_item MI INNER JOIN restaurant R ON R.id = MI.restaurant_id \
                            ORDER BY R.name ASC", 
            function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.menu_item = results;
                complete();
            });
    }

    function getMenuItemNames(res, mysql, context, complete){
        mysql.pool.query("SELECT MI.id, R.name AS restaurant_name, MI.name AS menu_item_name FROM menu_item MI \
                            INNER JOIN restaurant R ON R.id = MI.restaurant_id ORDER BY R.name ASC", function(error, results, fields){
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
        //context.jsscripts = ["deleterecords.js"];
        var mysql = req.app.get('mysql');
        getMenuItem(res, mysql, context, complete);
        function complete(){
            callbackCount++; 
            if(callbackCount >= 1){
                res.json(context);
            }

        }
    });

    /*Returns menu items with assoc restaurants*/

    router.get('/names', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleterecords.js"];
        var mysql = req.app.get('mysql');
        getMenuItemNames(res, mysql, context, complete);
        function complete(){
            callbackCount++; 
            if(callbackCount >= 1){
                res.json(context);
            }

        }
    });


    /* Adds a menu item, redirects to the menu item page after adding */

    router.post('/', function(req, res){
        //console.log(req.body.menu_item)
        //console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO menu_item (name, restaurant_id, price, description) VALUES (?,?,?,?)";
        var inserts = [req.body.menu_item_name, req.body.restaurant_id, req.body.price, req.body.description];
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


    /* The URI that update data is sent to in order to update a menu item */

       router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE menu_item SET name=?,restaurant_id=?, price=?, description=? WHERE id=?";
        var inserts = [req.body.menu_item_name, req.body.restaurant_id, req.body.price, req.body.description, req.params.id];
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
