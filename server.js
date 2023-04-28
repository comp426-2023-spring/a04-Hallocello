#!/usr/bin/env node

//Begin with required import statements
import {rps_function, rpsls_function} from './lib.server.js'
import minimist from 'minimist'
import express from 'express'
import cors from 'cors'

//Reads and stores input
var argv = minimist(process.argv.slice(2));

//Set the port to be the value passed in. If there's not one, then default it to 5000
const port = argv.port || 5000;

//This constant will do much of the heavy lifting for the program
const app = express();

//Provide security against cross-origin requests
app.use(cors());

//Provide the means to parse the body
app.use(express.json());

//The check to make sure that we send 200 OK at the endpoint
app.get('/app/', (req, res) => {
	res.status(200).send('200 OK')
});

//The check at the end of /app/rps/ that starts that game
app.get('/app/rps/', (req, res) => {
	res.status(200).send(JSON.stringify(rps()))
});

//The check at the end of /app/rpsls/ that starts that game
app.get('/app/rpsls/', (req, res) => {
	res.status(200).send(JSON.stringify(rpsls()))
});

//Accepts /app/rps/play/ and /app/rpsls/play respectively. Note that first it deals
//first with a get and then a post
app.get('/app/rps/play/', (req, res) => {
    res.status(200).send(JSON.stringify(rps(req.query.shot)))
});

app.post('/app/rps/play/', (req, res) => {
    res.status(200).send(JSON.stringify(rps(req.body.shot)))
})

app.get('/app/rpsls/play/', (req, res) => {
    res.status(200).send(JSON.stringify(rpsls(req.query.shot)))
});

app.post('/app/rpsls/play/', (req, res) => {
    res.status(200).send(JSON.stringify(rpsls(req.body.shot)))
})

pp.get('/app/rps/play/:shot/', (req, res) => {
    res.status(200).send(JSON.stringify(rps(req.params.shot)))
});


app.get('/app/rpsls/play/:shot/', (req, res) => {
    res.status(200).send(JSON.stringify(rpsls(req.params.shot)))
});

//Throwing errors in case something goes horribly wrong.
app.get('*', (req, res) => {
    res.status(404).send("404 NOT FOUND")
});

app.listen(port, () => {
	console.log("Server listening on port " + port);
})


