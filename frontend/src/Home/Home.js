import Divider from "@mui/material/Divider"
import Stack from "@mui/material/Stack"
import CreateGame from "./CreateGame"
import JoinGame from "./JoinGame"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

function Home({socket}) {
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        socket.on("roomCreation", (data) => {
            setCode(data)
        })
        return () => {
        }
    }, [])

    useEffect(() => {
        if (code === "") return

        navigate(`/lobby/${code}`)
        return () => {
        }
    }, [code])

    return (
        <Stack 
            spacing={5} height="100vh" 
            justifyContent="center" 
            divider={<Divider orientation="horizontal" flexItem />} 
            paddingLeft="25vw"
            paddingRight="25vw"
        >
            <CreateGame socket={socket}/>
            <JoinGame />
        </Stack>
    );
}

export default Home;
