import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField"
import Container from "@mui/material/Container"
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const GameGrid = ({ words, socket }) => {
  const getCardColor = (wordObj) => {
    const capturedBy = wordObj['capturedBy']

    if (capturedBy === "") {
      return {}
    }

    return capturedBy === socket.id
      ? {backgroundColor:"#7FFFD4"}
      : {backgroundColor:"#A52A2A"}
  }

  return (
    <Box sx={{ flexGrow: 1 }} mt={8}>
      <Grid container spacing={3} >
        {words.map((wordObj, idx) => (
          <Grid item md={3} key={idx}>
            <Paper variant="outlined" style={getCardColor(wordObj)}>
              {wordObj['word']}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

const AnswerInputBox = ({ socket, lobbyCode }) => {
  const [answer, setAnswer] = React.useState('');

  const handleChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      socket.emit("wordCompleted", socket.id, answer, lobbyCode)
    }
  }

  return (
    <TextField 
      id="outlined-basic" 
      label="Input Word" 
      variant="outlined"
      fullWidth
      margin="normal"
      value={answer}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  )
}

export default function Lobby({socket}) {
  const { lobbyCode } = useParams()
  const [words, setWords] = useState([])

  socket.on(`updateState`, (data) => {
    console.log("updateState: " , data)
    setWords(data)
  })

  // TODO: Setup socket listener to update words
  useEffect(() => {
  }, [])

  return (
    <Container>
      <GameGrid words={words} socket={socket} lobbyCode={lobbyCode}/>
      <AnswerInputBox socket={socket} lobbyCode={lobbyCode}/>
    </Container>
  )
}
