const Lobby = require('./lobby')

class LobbyManager {
    // lobbyCode <-> lobby
    lobbies = new Map()

    constructor() {}

    // Generates a unique 6-digit lobbyCode
    generateLobbyCode() {
        var candidateCode = Math.floor(100000 + Math.random() * 900000)
        while (this.lobbies.has(candidateCode)) {
            candidateCode = Math.floor(100000 + Math.random() * 900000)
        }
        return candidateCode.toString()
    }

    startLobbyGame(lobby) {
        const gameWords = lobby.startGame()
        return gameWords
    }

    createLobby(player, lobbySize) {
        const lobbyCode = this.generateLobbyCode()
        const newLobby = new Lobby(lobbyCode, lobbySize)

        newLobby.addPlayer(player)
        this.lobbies.set(lobbyCode, newLobby)
        return lobbyCode
    }

    /**
     * Adds a player to a lobby identified by the lobbyCode. Once the number of players meets the lobby limit,
     * the game will start.
     */
    joinLobby(lobbyCode, player) {
        if (!this.lobbies.has(lobbyCode)) {
            console.log(`lobbyCode ${lobbyCode} does not exist`)
            return []
        }

        const lobby = this.lobbies.get(lobbyCode) 
        lobby.addPlayer(player)

        console.log("Trying to start lobby game")
        if (lobby.canStartGame()) {
            // Always try to start game, when someone joins the lobby
            return this.startLobbyGame(lobby)
        }

        return []
    }

    tryCompletedWord(socketID, completedWord, lobbyCode) {
        const lobby = this.lobbies.get(lobbyCode)
        return true
    }

    getLobbyState(lobbyCode) {
        const lobby = this.lobbies.get(lobbyCode)
        return lobby.gameWords

    }

    
  }

  module.exports = LobbyManager
