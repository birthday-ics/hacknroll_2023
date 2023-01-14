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
    generateGameWords() {
        return ["hello", "world", "ben", "royce", "hans"]
    }

    startGame() {
        if (this.players.size != this.lobbySize) {
            console.log("Number of players do not meet lobby size, unable to start game")
            return []
        }

        const generatedGameWords = this.generateGameWords()
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
