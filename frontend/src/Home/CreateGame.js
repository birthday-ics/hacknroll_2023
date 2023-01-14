import Button from "@mui/material/Button";
const { io } = require("socket.io-client");

const socket = io();

initializeConnection = () => {
    socket.emit("connect", (s) => {
        
    })
}

function CreateGame() {
    return <Button variant="contained">Create Game</Button>;
}

export default CreateGame;