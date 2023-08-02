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


    return (
     
        <AppContext.Provider value={providerState} >

         <HamburgerMenu/>
            <UProfile/>
            <OProfile/>
            {/* <Settings/> */}
          {/* <Component /> */}

            <div className="App">
            <div>
            <Board/>
            
            </div>
             <Sidebar/>
             <div className="Appp">
             <SettingIcon onClick={handleSettingIconClick} />
      {showSettings && <SettingsInterface onClose={handleSettingIconClick} />}
             </div>
            </div>
      
        </AppContext.Provider>
       
    ); 
}

export default App;
