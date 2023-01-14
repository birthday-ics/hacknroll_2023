const LobbyManager = require('./lobby/lobbyManager.js')
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

    socket.on('join', async (lobbyCode, socketId) => {
        await socket.join(`${lobbyCode}`)
        lobbyManager.joinLobby(lobbyCode, socketId);
        console.log(`Client joined room ${lobbyCode}`)
        io.sockets.emit(`updateState`, lobbyManager.getLobbyState(lobbyCode))
    })

    socket.on('create', async (socketId) => {
        const lobbyCode = lobbyManager.createLobby(socketId, 2)
        await socket.join(`${lobbyCode}`)
        socket.emit('roomCreation', lobbyCode)
        console.log(`room created with ${lobbyCode} for ${socketId}`)
        io.sockets.emit(`updateState`, lobbyManager.getLobbyState(lobbyCode))
    })

    socket.on('wordCompleted', async (socketId, completedWord, lobbyCode) => {
        console.log(`lobby: ${lobbyCode} word completed: ${completedWord}`)
        const isSuccessful = lobbyManager.tryCompletedWord(socketId, completedWord, lobbyCode)
        if (isSuccessful) {
            // Tell client that it's successful
        }

        socket.emit(`updateState`, lobbyManager.getLobbyState(lobbyCode))
    })

    socket.on('leave', async ({ room }) => {
        socket.leave(`${room}`)
        console.log('client left room')
    })
})


server.listen(PORT, () => {
    console.log(`collab-service listening on port ${PORT}`)
})
