// ChessboardOutline.jsx
import React from 'react';
import './Sidebar.css';

import Control from '../Control/Control';
import TakeBack from '../Control/bits/TakeBack';
import MovesList from '../Control/bits/MovesList';
import OSProfile from '../OSProfile/OSProfile';



const Sidebar = () => {
  return (
    <div className="chessboard-outline">
        <Control>
        <MovesList/>
        <TakeBack/>
        </Control>
      <div className="white-outline">
     <OSProfile/>
     <div className="text-container">
          <p className='te'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo similique aliquam laudantium odio nemo. Saepe reprehenderit, ea necessitatibus dolorem natus eos officia pariatur perferendis architecto ducimus voluptatum ab commodi deleniti?</p>
        </div>
        </div>
       
    </div>
  );
};

export default Sidebar;