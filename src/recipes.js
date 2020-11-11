
// express connect us with localhost. You made request on localhost is stored in req while response from localhost is stored in res.
// request is used to hit api and get response from it.

// node core modules
const path = require('path');

// npm installed modules
const express = require('express');
const request = require('request');
const chalk = require('chalk');
const hbs = require('hbs');


// constants 
const app = express();
let url;
const publicDirPath = path.join(__dirname,'../public');

// setting hbs content
app.set('view engine','hbs');
app.use(express.static(publicDirPath));

// reading from server
app.get('',(req,res)=>{
    res.render('index');
});

app.get('/recipe',(req,res)=>{
    console.log(req.query);
    query = req.query.query;
    cuisine = req.query.cuisine;
    diet = req.query.diet;

    url = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=28de1c31664a460c8c095de681c38365';
    // diet

    diet && (url+=`&diet=${diet}`);
    // cuisine 
    cuisine && (url+=`&cuisine=${cuisine}`)
    // query 
    query && (url+=`&query=${query}`)
    // console.log(url);
    request.get(url,(error, {body})=>{
        console.log(url);
        // console.log(error);
        // console.log(body);
        parsedBody = JSON.parse(body);
        resultCount = parsedBody.totalResults;
        results = parsedBody.results;
        error && (
            res.send({
                
                error : 'error occured',
            })
        )
        resultCount && (
            res.send({
            
            results:results,
        }))
        !resultCount && (
            res.send({
                
            error:'no data found!',
        }))       
    })
});

// listening
app.listen(3000)
