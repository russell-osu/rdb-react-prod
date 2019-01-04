// Code has been inspired by the model code in CS 340 (although altered significantly)

module.exports = function(){
    var express = require('express');
    var router = express.Router();
    

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


    function getUserVisit(res, mysql, context, complete){
        mysql.pool.query("SELECT UV.user_id, UV.visit_id, U.fname, U.lname, DATE_FORMAT(V.visit_date, '%m/%d/%y') AS visit_date, \
                            R.name AS restaurant_name FROM user_visit UV \
                            INNER JOIN visit V on V.id = UV.visit_id \
                            INNER JOIN restaurant R ON R.id = V.restaurant_id \
                            INNER JOIN user U ON U.id = UV.user_id ORDER BY V.visit_date ASC", 
            function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.user_visit = results;
                complete();
            });
    }


    /*Display all user visit associations. Requires web based javascript to delete with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleterecords.js"];
        var mysql = req.app.get('mysql');
        getUserVisit(res, mysql, context, complete);
        getUser(res, mysql, context, complete);
        getVisit(res, mysql, context, complete);
        function complete(){
            callbackCount++; 
            if(callbackCount >= 3){
                res.render('user_visit', context);
            }

        }
    });


    /* Adds a user visit association, redirects to the user_visit page after adding */

    router.post('/', function(req, res){
        //console.log(req.body.menu_item)
        //console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO user_visit (user_id, visit_id) VALUES (?,?)";
        var inserts = [req.body.user_id, req.body.visit_id];

        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/user_visit');
            }
        });
    });


    /* Delete a user's visit  */
    /* This route will accept a HTTP DELETE request in the form
     * /uid/{{uid}}/vid/{{vid}} -- which is sent by the AJAX form 
     */
    router.delete('/uid/:uid/vid/:vid', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM user_visit WHERE user_id = ? AND visit_id = ?";
        var inserts = [req.params.uid, req.params.vid];
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
