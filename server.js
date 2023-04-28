//Begin with required import statements
import {rps_function, rpsls_function} from './lib/server.js'
import minimist from 'minimist'
import express from 'express'
import cors from 'cors'

//Reads and stores input
var args = minimist(process.argv.slice(2));

//Set the port to be the value passed in. If there's not one, then default it to 5000
const port = args.port || 5000;

//This constant will do much of the heavy lifting for the program
const app = express()

//Provide security against cross-origin requests
app.use(cors())

//Provide the means to parse the body
app.use(express.json());

// check endpoint that returns 200 OK
app.get('/app/', (req, res) => {
    res.status(200).send("200 OK")
});

// rps endpoint returns {"player": "(rock|paper|scissors)""}
app.get('/app/rps/', (req, res) => {
    res.status(200).send(JSON.stringify(rps_function()))
});

// rpsls endpoint returns {"player": "(rock|paper|scissors|spock|lizard)"}
app.get('/app/rpsls/', (req, res) => {
    res.status(200).send(JSON.stringify(rpsls_function()))
});


/*  https://dev.to/gathoni/express-req-params-req-query-and-req-body-4lpc was helpful 
    for understanding req.body, req.params, req.query
*/

/*  following routes should return {"player":"(rock|paper|scissors)","opponent":"(rock|paper|scissors)",
    "result":"(win|lose|tie)"}
*/
// using URLEncoded query parameters (req.query):
app.get('/app/rps/play/', (req, res) => {
    res.status(200).send(JSON.stringify(rps_function(req.query.shot)))
});
// using JSON body requests (req.body):
app.post('/app/rps/play/', (req, res) => {
    res.status(200).send(JSON.stringify(rps_function(req.body.shot)))
})

/*  following routes should return {"player":"(rock|paper|scissors)","opponent":"(rock|paper|scissors)",
    "result":"(win|lose|tie)"}
*/
// using URLEncoded query parameters (req.query):
app.get('/app/rpsls/play/', (req, res) => {
    res.status(200).send(JSON.stringify(rpsls_funtion(req.query.shot)))
});
// using JSON body requests (req.body):
app.post('/app/rpsls/play/', (req, res) => {
    res.status(200).send(JSON.stringify(rpsls_function(req.body.shot)))
})

/*  using route parameters (req.params): 
    returns {"player":"(rock|paper|scissors)","opponent":"(rock|paper|scissors)","result":"(win|lose|tie)"}
*/
app.get('/app/rps/play/:shot/', (req, res) => {
    res.status(200).send(JSON.stringify(rps_function(req.params.shot)))
});

/*  using route parameters (req.params):
    returns {"player":"(rock|paper|scissors|lizard|spock)","opponent":"(rock|paper|scissors|lizard|spock)","result":"(win|lose|tie)"}
*/
app.get('/app/rpsls/play/:shot/', (req, res) => {
    res.status(200).send(JSON.stringify(rpsls_function(req.params.shot)))
});

// default API endpoint that returns 404 NOT FOUND for any endpoints that are not defined
app.get('*', (req, res) => {
    res.status(404).send("404 NOT FOUND")
});

app.listen(port, () => {
	console.log("Server listening on port " + port);
})
