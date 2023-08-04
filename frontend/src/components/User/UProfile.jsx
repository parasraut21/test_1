import React from 'react';
import profilePhotoUrl from './user-image.svg';
import './UProfile.css';

const UProfile = ({name}) => {
  // const name = 'Paras Raut';

  return (
    <>
     <div className="profile-section">
      <img src={profilePhotoUrl} alt="Profile" className="profile-photo" /> 
      <div className="profile-name">{name}</div>
    </div>
    
    </>
   
    
  );
};

export default UProfile;