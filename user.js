// Code has been inspired by the model code in CS 340 (although altered significantly)

module.exports = function(){
    var express = require('express');
    var router = express.Router();
    


    function getUser(res, mysql, context, complete){
        mysql.pool.query("SELECT id, fname, lname FROM user ORDER BY lname ASC", 
            function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.user = results;
                complete();
            });
    }


    /*Display all users. Requires web based javascript to delete with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleterecords.js"];
        var mysql = req.app.get('mysql');
        getUser(res, mysql, context, complete);
        function complete(){
            callbackCount++; 
            if(callbackCount >= 1){
                //res.render('user', context);
                res.json(context);
            }

        }
    });


    /* Adds a user, redirects to the user page after adding */

    router.post('/', function(req, res){
        //console.log(req.body.user)
        //console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO user (fname, lname) VALUES (?,?)";
        var inserts = [req.body.fname, req.body.lname];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                //res.redirect('/user');
                res.status(201).end();
            }
        });
    });


       /* The URI that update data is sent to in order to update a user */

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE user SET fname=?, lname=? WHERE id=?";
        var inserts = [req.body.fname, req.body.lname, req.params.id];
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


    /* Route to delete a user, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM user WHERE id = ?";
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
