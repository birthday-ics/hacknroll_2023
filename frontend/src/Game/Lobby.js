import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField"
import Container from "@mui/material/Container"
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const userID = "test"

const GameGrid = ({ words }) => {
  const getCardColor = (wordObj) => {
    const capturedBy = wordObj['capturedBy']

    if (capturedBy === "") {
      return {}
    }

    return capturedBy === userID
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

const AnswerInputBox = () => {
  const [answer, setAnswer] = React.useState('');

  const handleChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleKeyDown = (event) => {
    // TODO: Send word through socket to server here, get response and update the GameGrid
    if (event.key === 'Enter') {
      alert(answer);
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

export default function Lobby() {
  const [words, setWords] = useState([
    {word: "fluffy", capturedBy: ""}, {word: "boy", capturedBy: ""}, {word: "text", capturedBy: ""}, {word: "example", capturedBy: ""},
    {word: "fluffy1", capturedBy: "test"}, {word: "boy1", capturedBy: ""}, {word: "text1", capturedBy: ""}, {word: "example1", capturedBy: ""},
    {word: "fluffy2", capturedBy: "otherID"}, {word: "boy2", capturedBy: ""}, {word: "text2", capturedBy: ""}, {word: "example2", capturedBy: ""},
    {word: "fluffy3", capturedBy: ""}, {word: "boy3", capturedBy: ""}, {word: "text3", capturedBy: ""}, {word: "example3", capturedBy: ""},
    {word: "fluffy4", capturedBy: ""}, {word: "boy4", capturedBy: ""}, {word: "text4", capturedBy: ""}, {word: "example4", capturedBy: ""},
    {word: "fluffy5", capturedBy: ""}, {word: "boy5", capturedBy: ""}, {word: "text5", capturedBy: ""}, {word: "example5", capturedBy: ""},
  ])

  // TODO: Setup socket listener to update words

  return (
    <Container>
      <GameGrid words={words}/>
      <AnswerInputBox/>
    </Container>
  )
}
