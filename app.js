import mysql from 'mysql2';
import express from 'express';
import cors from 'cors';

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'db_cours_dekpo'
});

// simple query
const viewClient = (req,res) => { 
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const page = req.query.page ? parseInt(req.query.page-1)*limit : 0;
    connection.query(
        'SELECT * FROM `client` ORDER BY `ClientId` ASC LIMIT ' + page + ',' + limit,
        function(err, results, fields) {
            res.send(results); // results contains rows returned by server
            /* console.log(fields); // fields contains extra meta data about results, if available  */
        }
    )
}

const app = express();
app.use(cors());
app.listen(3000);
app.get('/', viewClient);