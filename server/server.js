const express = require('express')
const LobbyManager = require('./lobby/lobbyManager.js')
const app = express()
const PORT = 8080
const lobbyManager = new LobbyManager();
const server = require('http').createServer();
const io = require('socket.io')(server);


io.on('connection', (socket) => {
    const sessionID = socket.id;
    console.log(`Client connected with id ${sessionID}`)

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })

    socket.on('join', async (room) => {
        await socket.join(`${room}`)
        console.log(`Client joined room ${room}`)
    })

    socket.on('wordCompleted', async (someObject) => {
        // TODO: update lobby
        const {word, user} = JSON.parse(someObject)
        console.log('Updated lobby')
    })

    socket.on('leave', async ({ room }) => {
        socket.leave(`${room}`)
        console.log('client left room')
    })
})


server.listen(PORT, () => {
    console.log(`collab-service listening on port ${PORT}`)
})

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// /**
//  * body {
//  *  lobbySize: int,
//  *  player: WebSocketClient
//  * }
//  */
// app.get('/api/lobbies/create', (req, res, next) => {
//     console.log("Creating new lobby")

//     // TODO: Update player when creating lobby
//     const player = "testPlayer"

//     // TODO: Update lobbySize when creating lobby
//     var lobbyCode = lobbyManager.createLobby(player, 1)
//     console.log(`Created new lobby with lobbyCode: ${lobbyCode}`)
//     res.send(`Lobby created ${lobbyCode}`)
// });

// app.get('/api/lobbies/:lobbyCode', (req, res, next) => {
//     var lobbyCode = req.params.lobbyCode;
//     const player = "testPlayer2"
//     const potentialGameWords = lobbyManager.joinLobby(lobbyCode, player)
//     console.log(`Joined lobby: ${lobbyCode}`)

//     // TODO: Broadcast to all lobby clients whether game has started or not
//     res.send(potentialGameWords)
//     return potentialGameWords
// });

