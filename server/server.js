const express = require('express')
const LobbyManager = require('./lobby/lobbyManager.js')
const app = express()
const port = 3000
const lobbyManager = new LobbyManager();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

/**
 * body {
 *  lobbySize: int,
 *  player: WebSocketClient
 * }
 */
app.get('/api/lobbies/create', (req, res, next) => {
    console.log("Creating new lobby")

    // TODO: Update player when creating lobby
    const player = "testPlayer"

    // TODO: Update lobbySize when creating lobby
    var lobbyCode = lobbyManager.createLobby(player, 1)
    console.log(`Created new lobby with lobbyCode: ${lobbyCode}`)
    res.send(`Lobby created ${lobbyCode}`)
});

app.get('/api/lobbies/:lobbyCode', (req, res, next) => {
    var lobbyCode = req.params.lobbyCode;
    const player = "testPlayer2"
    const potentialGameWords = lobbyManager.joinLobby(lobbyCode, player)
    console.log(`Joined lobby: ${lobbyCode}`)

    // TODO: Broadcast to all lobby clients whether game has started or not
    res.send(potentialGameWords)
    return potentialGameWords
});

app.listen(port, () => {
})
