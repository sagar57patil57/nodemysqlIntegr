const express = require('express');
const mysql = require('mysql');
const app = express();

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'sagar',
    password: 'Sagar@123',
    database: 'company'
});

conn.connect((err) => {
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
  });

  
//conn.query('query', cb);  ---------------------
conn.query('SELECT * FROM employees', (err,data) => {   //READ
    if(err) throw err;
    console.log('Read...', data);
    /*data.forEach( (row) => {
        console.log(`${row.name} is in ${row.location}`);
      });*/
});


//Insert data into db   ----------------------------
const data = {
    name: 'sagar',
    location: 'india'
}
conn.query('INSERT INTO employees SET ?', data, (err, res)=>{   //INSERT
    if(err) throw err;
    console.log('Inserted...');
});


//updating data :while passing multiple ? in query , second arg will be array   ---------
conn.query('UPDATE employees SET location = ? where id = ?', ['pune',1],(err)=>{  //UPDATE
    if(err){
        console.log(err);
    }
});


//deleting data ------------------------------------------
const idToDelete = 7;
conn.query('DELETE FROM employees where id = ?', idToDelete, (err)=>{
    if(err) throw err;
});


//extra queries     -----------------------------
conn.query('select count(name) from employees',(err, data)=>{
    if(err) throw err;
    console.log('Rows...', data);
});

const names = '%gar';
conn.query('SELECT * FROM employees where name like ?', names,(err, data)=>{
    if(err) throw err;
    console.log('Rows...', data);
});


app.listen(3000,()=>{   //start server  ---------------------
    console.log('server...');
});