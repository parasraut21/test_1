import React, { useState } from 'react';
import profilePhotoUrl from './Settings.svg';
import './Settings.css';

// const Settings = () => {
  

//   return (
//     <>
//      {/* <div className="profile-sections">
//       <img src={profilePhotoUrl} alt="Settings" className="setting-photo-s" /> 
//     </div> */}

    
//     </>
//   );
// };

// export default Settings;

const SettingIcon = ({ onClick }) => {
    return (
      <div className="setting-icon" onClick={onClick}>
      <img src={profilePhotoUrl} alt="Settings" className="setting-photo-s" /> 
      </div>
    );
  };

  export default SettingIcon;