#!/usr/bin/env node

//Begin with required import statements
import {rps_function, rpsls_function} from './lib/server.js'
import minimist from 'minimist'
import express from 'express'
import cors from 'cors'

var argv = minimist(process.argv.slice(2));
const port = argv.port || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/app', (req, res) => {
    res.status(200).send('200 OK').end();
});

/**
 * Random rps shot
 */
app.get('/app/rps', (req, res) => {
    res.status(200).send(JSON.stringify(rps_function(req.body.shot))).end();
})

/**
 * Random rpsls shot
 */
app.get('/app/rpsls', (req, res) => {
    res.status(200).send(JSON.stringify(rpsls_function(req.body.shot))).end();
})

/**
 * URLEncoded
 * Note: This is a GET
 * Example: http://localhost:5000/app/rps/play?shot=rock
 */
app.get('/app/rps/play', (req, res) => {
    res.status(200).send(JSON.stringify(rps_function(req.query.shot))).end();
})

/**
 * URLEncoded
 * Note: This is a GET
 * Example: http://localhost:5000/app/rps/play?shot=spock
 */
app.get('/app/rpsls/play', (req, res) => {
    res.status(200).send(JSON.stringify(rpsls_function(req.query.shot))).end();
})

/**
 * JSON
 * Note: This is a POST
 */
app.post('/app/rps/play', (req, res) => {
    res.status(200).send(JSON.stringify(rps_function(req.body.shot))).end();
})

/**
 * JSON
 * Note: This is a POST
 */
app.post('/app/rpsls/play', (req, res) => {
    res.status(200).send(JSON.stringify(rpsls_function(req.body.shot))).end();
})

/**
 * /:shot syntax allows for that field to be parsed
 */
app.get('/app/rps/play/:shot', (req, res) => {
    res.status(200).send(JSON.stringify(rps_function(req.params.shot))).end();
})

/**
 * /:shot syntax allows for that field to be parsed
 */
app.get('/app/rpsls/play/:shot', (req, res) => {
    res.status(200).send(JSON.stringify(rpsls_function(req.params.shot))).end();
})

/**
 * Default (non-existent) endpoint
 */
app.all('*', (req, res) => {
    res.status(404).send('404 NOT FOUND').end();
})

app.listen(port);
