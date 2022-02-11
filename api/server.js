const express = require('express');
const server = express();
server.use(express.json());

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
const actionsRouter = require('./actions/actions-router');

server.use('/api/actions', actionsRouter);

// Build your projects router in /api/projects/projects-router.js
const projectsRouter = require('./projects/projects-router');

server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
    res.json({ message: 'Api is working add a route to see more' });
    console.log('api is working');
})
server.use("*", (req,res)=>{
    res.status(404).json({
        message: 'not found'
    })
})

server.use((err, req, res) => {
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    })
})

// Do NOT `server.listen()` inside this file!

module.exports = server;
