const express = require('express')
const LobbyManager = require('./lobby/lobbyManager.js')
const app = express()
const PORT = 8080
const lobbyManager = new LobbyManager();
const server = require('http').createServer();
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});


io.on('connection', (socket) => {
    const sessionID = socket.id;
    console.log(`Client connected with id ${sessionID}`)

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })

    socket.on('join', async (room, socketId) => {
        await socket.join(`${room}`)
        lobbyManager.joinLobby(room, socketId);
        console.log(`Client joined room ${room}`)
    })

    socket.on('create', async (socketId) => {
        const lobbyCode = lobbyManager.createLobby(socketId, 2)
        socket.emit('roomCreation', lobbyCode)
        console.log(`room created with ${lobbyCode} for ${socketId}`)
    })

    socket.on('wordCompleted', async (socketId, completedWord, lobbyCode) => {
        console.log(`lobby: ${lobbyCode} word completed: ${completedWord}`)
        // const isSuccessful = lobbyManager.tryCompletedWord(socketId, completedWord)
        // if (isSuccessful) {
        //     // Tell client that it's successful
        // }

        // // Update room state
        // const lobbyState = lobbyManager.getLobbyState(lobbyCode)
        const lobbyState = [
            {word: "fluffy", capturedBy: ""}, {word: "boy", capturedBy: ""}, {word: "text", capturedBy: ""}, {word: "example", capturedBy: ""},
            {word: "fluffy1", capturedBy: "test"}, {word: "boy1", capturedBy: ""}, {word: "text1", capturedBy: ""}, {word: "example1", capturedBy: ""},
            {word: "fluffy2", capturedBy: "otherID"}, {word: "boy2", capturedBy: ""}, {word: "text2", capturedBy: ""}, {word: "example2", capturedBy: ""},
            {word: "fluffy3", capturedBy: ""}, {word: "boy3", capturedBy: ""}, {word: "text3", capturedBy: ""}, {word: "example3", capturedBy: ""},
            {word: "fluffy4", capturedBy: ""}, {word: "boy4", capturedBy: ""}, {word: "text4", capturedBy: ""}, {word: "example4", capturedBy: ""},
            {word: "fluffy5", capturedBy: "test"}, {word: "boy5", capturedBy: ""}, {word: "text5", capturedBy: ""}, {word: "example5", capturedBy: ""},
        ]
        socket.emit(`updateState`, lobbyState)
        
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

