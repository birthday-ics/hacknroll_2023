import Button from "@mui/material/Button";

function CreateGame({socket}) {
    const handleCreateGame = () => {
        socket.emit("create", socket.id)
        console.log("Create event emitted")
    };
    return <Button variant="contained" onClick={handleCreateGame}>Create Game</Button>;
}

export default CreateGame;
