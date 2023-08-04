// // ChessboardOutline.jsx
// import React, { useState, useEffect } from 'react';
// import './Sidebar.css';

// import Control from '../Control/Control';
// import TakeBack from '../Control/bits/TakeBack';
// import MovesList from '../Control/bits/MovesList';
// import OSProfile from '../OSProfile/OSProfile';
// import io from "socket.io-client";
// import { useSelector } from 'react-redux';

// const Sidebar = () => {

//   const socket = io.connect("http://localhost:8000");
//   const messagesList = useSelector((state) => state.messagesList);
  
//   return (
//     <div className="chessboard-outline">
//         <Control>
//         <MovesList/>
//         <TakeBack/>
//         </Control>
//       <div className="white-outline">
//      <div className="text-container">
//      <h1> Messages:</h1>
//       {messagesList.map((msg, index) => (
//         <p key={index}>
//           {msg.userName1}: {msg.message}
//         </p>
//       ))}

//         </div>
//         </div>
       
//     </div>
//   );
// };

// export default Sidebar;


import React, { useState, useEffect, useRef } from 'react';
import './Sidebar.css';

import Control from '../Control/Control';
import TakeBack from '../Control/bits/TakeBack';
import MovesList from '../Control/bits/MovesList';
import OSProfile from '../OSProfile/OSProfile';
import io from "socket.io-client";
import { useSelector } from 'react-redux';

const Sidebar = ({userName}) => {
  const socket = io.connect("http://localhost:8000");
  const messagesList = useSelector((state) => state.messagesList);
  
  const messagesRef = useRef(null);

  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messagesList]);

  return (
    <div className="chessboard-outline">
        <Control>
        <MovesList/>
        <TakeBack/>
        </Control>
 
        <div className="text-container" ref={messagesRef}>
          <h2>Messages:</h2>
          {/* {messagesList.map((msg, index) => (
            <p key={index}>
              {msg.userName1}: {msg.message}
            </p>
          ))} */}
          {messagesList.map((msg, index) => (
  <p
    key={index}
    className={`message ${msg.userName1 === userName ? 'sender' : 'receiver'}`}
  >
    {msg.userName1}: {msg.message}
  </p>
))}
        
      </div>
    </div>
  );
};

export default Sidebar;
