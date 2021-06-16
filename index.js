'use strict';

//Fully-functioning Address Book web app that runs a local server and displays information
//from the imported database db.js

const http = require('http');
const friendArray = require('./db.js')
const hostname = '127.0.0.1';
const port = 3000;

const express = require('express');
const { response } = require('express');
const app = express();

const server = http.createServer(app);

app.get('/', (req, res) => {
    const snippet = `<h1>Hello from the Root Route!</h1>`
    res
        .status(200)
        .send(snippet)
        .end()
});

app.get('/friends', (req, res) => {
    let friendHTML = '<ul>';
    friendArray.map(friend => {
        friendHTML += `<li>
                          <a href="${req.path}/${friend.handle}">${friend.name}</a>
                       </li>`
    })
    friendHTML += `<ul>`;
    res.status(200).send(friendHTML).end()
})

app.get('/friends/:handle', (req, res) => {
    htmlData = `<h1>Friends Route</h1>`;
    const {handle} = req.params;
    const friend = friendArray.find(f => f.handle === handle);
    if (friend) {
        htmlData += `<h1>${friend.name}</h1>`;
        htmlData += `<h3>${friend.handle}</h3>`;
        htmlData += `<h4>Skills: ${friend.skill}</h4>`;
        res.status(200).send(htmlData).end()
    } else {
        res
            .status(404)
            .send(`No friend with handle ${handle}`)
    }
})

app.get('*', (req, res) => {
    res.send("404 - Page not found")
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})