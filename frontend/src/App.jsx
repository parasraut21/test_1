import './App.css';
import Board from './components/Board/Board';
import React, { useState,useEffect } from 'react';
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
import  createPosition  from './CreatePosition'
import Piece from './components/Pieces/Piece';
import Home from './Home';
import NameEntry from './components/NameEntry/NameEntry';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RoomPage from './RoomPage';
function App() {

    const [appState, dispatch ] = useReducer(reducer,initGameState);

    const providerState = {
        appState,
        dispatch
    }


    const [showSettings, setShowSettings] = useState(false);

    const handleSettingIconClick = () => {
      setShowSettings(!showSettings);
    };
//
const [userName, setUserName] = useState("");
const [joinedRoom, setJoinedRoom] = useState(null);


    return (
     
        <Router>
        <Routes>
        <Route path="/" element={<NameEntry setName={setUserName} />} />
        {/* <Route path="/room" element={<RoomPage />} /> */}
       <Route path="/room" element={ <RoomPage/> } />
       
       
       </Routes>
    </Router>
    ); 
}

export default App;
