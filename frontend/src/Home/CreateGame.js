import Button from "@mui/material/Button";
import { useEffect } from "react"

function CreateGame({socket}) {
    useEffect(() => {
        socket.emit("create", socket.id);
        return () => {
        }
    }, [])

    return <Button variant="contained">Create Game</Button>;
}

export default CreateGame;
