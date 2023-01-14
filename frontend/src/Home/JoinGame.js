import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"

function JoinGame() {
    const [input, setInput] = useState('');
    const navigate = useNavigate();
    const roomIdInput = useRef(null);

    // use enter to enter room id
    useEffect(() => {
        const keyDownHandler = event => {
            // Check if button pressed is enter and chat input is currently selected
            if (event.key === 'Enter' && document.activeElement === roomIdInput.current) {
                event.preventDefault()
                handleGo()
            }
        }
        document.addEventListener('keydown', keyDownHandler)
        return () => {
            document.removeEventListener('keydown', keyDownHandler)
        }
    })

    const handleGo = () => {
        navigate(`/lobby/${input}`)
    }

    return <Stack direction="row" width="100%">
        <TextField 
            id="outlined-basic" 
            label="Join Room" 
            variant="outlined" 
            fullWidth 
            onChange={(e) => setInput(e.target.value)} 
            value={input} 
            ref={roomIdInput}/>
        <Button onClick={handleGo}>Go</Button>
    </Stack>
}

export default JoinGame;
