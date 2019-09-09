// Code has been inspired by the model code in CS 340 (although altered significantly)
module.exports = function(){
    var express = require('express');
    var router = express.Router();
    


    function getCuisine(res, mysql, context, complete){
        mysql.pool.query("SELECT id, name FROM cuisine ORDER BY name ASC", 
            function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.cuisine = results;
                complete();
            });
    }


    /*Display all cuisines. Requires web based javascript to delete with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getCuisine(res, mysql, context, complete);
        function complete(){
            callbackCount++; 
            if(callbackCount >= 1){
                res.json(context);
            }

        }
    });


    /* Adds a cuisine, redirects to the cuisine page after adding */

    router.post('/', function(req, res){
        //console.log(req.body.cuisine)
        //console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO cuisine (name) VALUES (?)";
        var inserts = [req.body.cuisine_name];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/cuisine');
            }
        });
    });


    /* Route to delete a cuisine. Simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM cuisine WHERE id = ?";
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
