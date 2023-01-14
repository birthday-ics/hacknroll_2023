import Divider from "@mui/material/Divider"
import Stack from "@mui/material/Stack"
import CreateGame from "./CreateGame"
import JoinGame from "./JoinGame"

function Home() {
    return (
    <Stack 
    spacing={5} height="100vh" 
    justifyContent="center" 
    divider={<Divider orientation="horizontal" flexItem />} 
    paddingLeft="25vw"
    paddingRight="25vw"
    >
        <CreateGame />
        <JoinGame />
    </Stack>
    );
}

export default Home;