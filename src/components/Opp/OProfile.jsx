import React from 'react';
import profilePhotoUrl from './opp.png';
import './OProfile.css';

const OProfile = () => {
  const name = 'Opponent';

  return (
    <>
     <div className="profile-sectionO">
      <img src={profilePhotoUrl} alt="Profile" className="profile-photo" /> 
      <div className="profile-name">{name}</div>
    </div>
    
    </>
   
    
  );
};

export default OProfile;