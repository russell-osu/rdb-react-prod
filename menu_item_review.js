// Code has been inspired by the model code in CS 340 (although altered significantly)

module.exports = function(){
    var express = require('express');
    var router = express.Router();
    

    function getMenuItem(res, mysql, context, complete){
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

    function getUser(res, mysql, context, complete){
        mysql.pool.query("SELECT id, fname, lname FROM user ORDER BY fname ASC", function(error, results, fields){
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


    function getMenuItemReview(res, mysql, context, complete){
        mysql.pool.query("SELECT MIR.id, MI.name AS menu_item_name, R.name AS restaurant_name, U.fname, U.lname, \
                            DATE_FORMAT(V.visit_date, '%m/%d/%y') AS visit_date, MIR.review FROM menu_item_review MIR \
                            LEFT JOIN visit V on V.id = MIR.visit_id \
                            LEFT JOIN user U ON U.id = MIR.user_id \
                            INNER JOIN menu_item MI ON MI.id = MIR.menu_item_id \
                            INNER JOIN restaurant R ON R.id = MI.restaurant_id \
                            ORDER BY R.name ASC", 
            function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.menu_item_review = results;
                complete();
            });
    }


    /*Display all restaurant_reviews. Requires web based javascript to delete with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleterecords.js"];
        var mysql = req.app.get('mysql');
        getMenuItemReview(res, mysql, context, complete);
        // getMenuItem(res, mysql, context, complete);
        // getUser(res, mysql, context, complete);
        // getVisit(res, mysql, context, complete);
        function complete(){
            callbackCount++; 
            if(callbackCount >= 1){
                //res.render('menu_item_review', context);
                res.json(context);
            }

        }
    });


    /* Adds a restaurant_review, redirects to the restaurant_review page after adding */

    router.post('/', function(req, res){
        //console.log(req.body.menu_item)
        //console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO menu_item_review (menu_item_id, user_id, review, visit_id) VALUES (?,?,?,?)";
        var inserts = [req.body.menu_item_id, req.body.user_id, req.body.review, req.body.visit_id];

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
                res.redirect('/menu_item_review');
            }
        });
    });


    /* The URI that update data is sent to in order to update a menu item review*/

        router.put('/:id', function(req, res){
            var mysql = req.app.get('mysql');
            var sql = "UPDATE menu_item_review SET menu_item_id=?,user_id=?, review=? WHERE id=?";
            var inserts = [req.body.menu_item_id, req.body.user_id, req.body.review, req.params.id];
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
        var sql = "DELETE FROM menu_item_review WHERE id = ?";
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
