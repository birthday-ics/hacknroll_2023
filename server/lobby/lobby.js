const randomWord = require('random-word')

class Lobby {
    // playerID <-> WebSocketClient
    players = new Map()
    gameWords = []
    clearedWords = []

    constructor(lobbyCode, lobbySize) {
        this.lobbyCode = lobbyCode
        this.lobbySize = lobbySize
    }

    // TODO: Generate random words
    generateInitialGameWords() {
        const wordList = []
        for (let i = 0; i < 24; i++) {
            wordList.push(randomWord());
        }
        return wordList
    }

    startGame() {
        if (this.players.size != this.lobbySize) {
            console.log("Number of players do not meet lobby size, unable to start game")
            return []
        }

        const generatedGameWords = this.generateInitialGameWords()
        this.gameWords = generatedGameWords
        return generatedGameWords
    }

    canStartGame() {
        return this.players.size == this.lobbySize
    }

    addPlayer(player) {
        if (this.players.size == this.lobbySize) {
            return
        }

        // TODO: Map playerID to player WebSocketClient
        this.players.set(player, player)
        return
    }
}

module.exports = Lobby
