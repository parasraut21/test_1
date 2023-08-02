
import React, { useState } from 'react';
import './SettingsInterface.css';
import { actionCreator } from "../../state/index";
import { bindActionCreators } from "redux";
import { useAppContext }from '../../contexts/Context'
import { useDispatch, useSelector } from 'react-redux';
import { setPieceClassName } from './../../reducer/actions/game'

const SettingsInterface = ({ onClose }) => {

  const { appState, dispatch } = useAppContext();

  const [selectedTheme, setSelectedTheme] = useState('default'); // Set the default theme here

  const handleThemeChange = (event) => {
    setSelectedTheme(event.target.value);
  };

  const handleApplyTheme = () => {
    onClose(selectedTheme);
    // actions.Ptheme(selectedTheme);
    //  console.log(selectedTheme);
    dispatch(setPieceClassName(selectedTheme === 'default' ? 'a' : 'p'));

  };

  const themeOptions = ['default', 'Alpha']; 

  return (
    <div className="settings-interface">
      <h3 className='pie' > Pieces : </h3>
      <div className="theme-options">
        <select value={selectedTheme} onChange={handleThemeChange}>
          {themeOptions.map((theme) => (
            <option key={theme} value={theme}>
              {theme} Theme
            </option>
          ))}
        </select>
      </div>
      <button className="apply-button" onClick={handleApplyTheme}>
        Apply Theme
      </button>
      <button className="close-button" onClick={() => onClose(selectedTheme)}>
        Close
      </button>
    </div>
  );
};

export default SettingsInterface;

