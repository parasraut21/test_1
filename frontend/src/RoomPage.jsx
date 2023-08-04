// RoomPage.jsx

import io from "socket.io-client";
import { useLocation } from "react-router-dom";
import Board from './components/Board/Board';
import React, { useState, useEffect } from 'react';
import { reducer } from './reducer/reducer'
import { useReducer } from 'react'
import { initGameState } from './constants';
import AppContext from './contexts/Context'
import store from './Store';
import { Provider } from 'react-redux';
import UProfile from './components/User/UProfile';
import OProfile from './components/Opp/OProfile';
import HamburgerMenu from './components/HamburgerMenu/HamburgerMenu';
import Sidebar from './components/Sidebar/Sidebar';
import SettingIcon from './components/Settings/SettingIcon';
import SettingsInterface from './components/Settings/SettingsInterface';
import Component from './Component';
import { useSelector } from "react-redux";
import createPosition from './CreatePosition'
import Piece from './components/Pieces/Piece';
import { useDispatch } from 'react-redux';
import { addMessage } from "./state/action_creater/action_creater";

const RoomPage = () => {
  const dispatched = useDispatch();
  const location = useLocation();
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [oppo, setOppo] = useState("");
  const [nameDisabled, setNameDisabled] = useState(false); 
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  const [isRoomJoined, setIsRoomJoined] = useState(false); // State to track room join status
  const socket = io.connect("http://localhost:8000");


  const [appState, dispatch] = useReducer(reducer, initGameState);

  const providerState = {
    appState,
    dispatch
  }


  const [showSettings, setShowSettings] = useState(false);

  const handleSettingIconClick = () => {
    setShowSettings(!showSettings);
  };
  //



  useEffect(() => {
    const state = location.state;
    if (state && state.userName) {
      setUserName(state.userName);
    }
  }, [location]);

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
      setIsRoomJoined(true); // Set room join status to true
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room, userName });
    setMessage(""); // Clear the input after sending the message
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      if (!nameDisabled) {
      if (data.userName != userName) {
        setOppo(data.userName);
        setNameDisabled(true)
      }
    }
      const receivedMessage = {
        userName1: data.userName, // Get the sender's name from the data
        message: data.message,
      };
      setMessagesList((prevMessages) => [...prevMessages, receivedMessage]);
      dispatched(addMessage(receivedMessage)); 
    });
    
  }, [socket]);

  return (
    <AppContext.Provider value={providerState} >
      <div>
        <HamburgerMenu />
        {oppo && 
        <OProfile name={oppo}/>
        }
         <UProfile name={userName}/>
       
        <div className="App">
          <div>
            <Board />
          </div>
          <Sidebar userName={userName} />
          <div className="Appp">
            <SettingIcon onClick={handleSettingIconClick} />
            {showSettings && <SettingsInterface onClose={handleSettingIconClick} />}
          </div>
        </div>
      </div>

      <h2>Welcome, {userName}!</h2>   <br />  {oppo ? <h2>Friend Joined, {oppo}!</h2> : <h2></h2>}
      {isRoomJoined ? (
        <h3>Room Number: {room}</h3>
      ) : (
        <div>
          <input
            placeholder="Room Number..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}> Join Room</button>
        </div>
      )}
      {isRoomJoined && (
        <div>
          <input
            placeholder="Message..."
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
          <button onClick={sendMessage}> Send Message</button>
        </div>
      )}
      <h1> Messages:</h1>
      {messagesList.map((msg, index) => (
        <p key={index}>
          {msg.userName1}: {msg.message}
        </p>
      ))}

    </AppContext.Provider>
  );
};

export default RoomPage;



