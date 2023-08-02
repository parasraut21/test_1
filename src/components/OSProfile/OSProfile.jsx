import React from 'react';
import profilePhotoUrl from './opp.png';
import './OSProfile.css';

const OSProfile = () => {
  const name = 'Opponent';

  return (
    <>
     <div className="profile-sectionOS">
      <img src={profilePhotoUrl} alt="Profile" className="profile-photo" /> 
      <div className="profile-name">{name} </div>
    </div>
    
    </>
   
    
  );
};

export default OSProfile;