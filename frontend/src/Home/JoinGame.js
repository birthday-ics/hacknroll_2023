import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"

function JoinGame() {
    return <Stack direction="row" width="100%">
        <TextField id="outlined-basic" label="Join Room" variant="outlined" fullWidth/>
        <Button>Go</Button>
    </Stack>
}

export default JoinGame;
