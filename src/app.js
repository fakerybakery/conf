/*
    Copyright 2020 Karan Shah.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

// Initialize
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
var stream = require('./ws/stream');
var path = require('path');
const port = 3100;

// Passing UI
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/pages', express.static(path.join(__dirname, 'pages')));
app.use('/index.html', express.static(path.join(__dirname + '/index.html')));
app.get('/', (req, res)=>{res.sendFile(__dirname+'/index.html');});

app.use('/.well-known/pki-validation/BEDCF239D9946A175A3E89A67CE52CDA.txt', express.static(path.join(__dirname + '/.well-known/pki-validation/BEDCF239D9946A175A3E89A67CE52CDA.txt')));
app.get('/.well-known/pki-validation', (req, res)=>{res.sendFile(__dirname+'/.well-known/pki-validation/BEDCF239D9946A175A3E89A67CE52CDA.txt');});

// Establish Connection
try {
    io.of('/stream').on('connection', stream);
    server.listen(port);
    console.log('Listening On Port ' + port);
} catch (err) {
    console.log('Unable To Established Connection On Port ' + port + '. Error Code: ' + err);
}