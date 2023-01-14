import { Routes, Route } from "react-router-dom"
import './App.css';
import Home from './Home/Home'
import Lobby from './Game/Lobby'
import io from "socket.io-client"

const socket = io();

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home socket={socket}/> } />
        <Route path="/lobby/:lobbyCode" element={ <Lobby socket={socket}/> }/>
      </Routes>
    </div>
  );
}

export default App;
