const randomWord = require('random-word')

class Lobby {
    // playerID <-> WebSocketClient
    players = new Map()
    gameWords = []

    constructor(lobbyCode, lobbySize) {
        this.lobbyCode = lobbyCode
        this.lobbySize = lobbySize
    }

    generateInitialGameWords() {
        const wordList = []
        for (let i = 0; i < 24; i++) {
            wordList.push({
                word: randomWord(),
                capturedBy: ""
            });
        }
        return wordList
    }

    startGame() {
        if (this.players.size != this.lobbySize) {
            console.log("Number of players do not meet lobby size, unable to start game")
            return []
        }

        console.log("Starting game")
        const generatedGameWords = this.generateInitialGameWords()
        this.gameWords = generatedGameWords
        return generatedGameWords
    }

    canStartGame() {
        console.log(`checking can start game with ${this.players.size} players`)
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

    tryToCompleteWord(player, completedWord) {
        console.log(`player: ${player} trying to complete word: ${completedWord}`)

        for (let i = 0; i < this.gameWords.length; i++) {
            const currWord = this.gameWords[i]['word']
            if (currWord !== completedWord) {
                continue
            }
            
            this.gameWords[i]['capturedBy'] = player
            return true
        }

        return false
    }
}

module.exports = Lobby
