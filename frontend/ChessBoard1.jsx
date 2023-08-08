import React, { Component } from "react";
import PropTypes from "prop-types";
import {Chess} from  "chess.js"; // import Chess from  "chess.js"(default) if recieving an error about new Chess() not being a constructor
import io from "socket.io-client";
import Chessboard from "chessboardjsx";

const socket = io.connect("http://localhost:8000");

class HumanVsHuman extends Component {
  static propTypes = { children: PropTypes.func };

  state = {
    fen: "start",
    // square styles for active drop square
    dropSquareStyle: {},
    // custom square styles
    squareStyles: {},
    // square with the currently clicked piece
    pieceSquare: "",
    // currently clicked square
    square: "",
    // array of past game moves
    history: [],
    endpoint: "http://localhost:5173/",
    game: null
  };

  componentDidMount() {
    this.setState({
      game: new Chess()
    });
  }

  componentDidUpdate(prevState) {
    if (prevState.fen !== this.state.fen) {
      socket.on('move', (msg) => {
        msg.game = new Chess(msg.fen);
        this.setState(msg);
      });
    }
  }

  // keep clicked square style and remove hint squares
  removeHighlightSquare = () => {
    this.setState(({ pieceSquare, history }) => ({
      squareStyles: squareStyling({ pieceSquare, history })
    }));
  };

  // show possible moves
  highlightSquare = (sourceSquare, squaresToHighlight) => {
    const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
      (a, c) => {
        return {
          ...a,
          ...{
            [c]: {
              background:
                "radial-gradient(circle, #fffc00 36%, transparent 40%)",
              borderRadius: "50%"
            }
          },
          ...squareStyling({
            history: this.state.history,
            pieceSquare: this.state.pieceSquare
          })
        };
      },
      {}
    );

    this.setState(({ squareStyles }) => ({
      squareStyles: { ...squareStyles, ...highlightStyles }
    }));
  };

  onDrop = async({ sourceSquare, targetSquare }) => {
    // see if the move is legal
    let move = this.state.game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q" // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return;
    const change = await this.setState(({ history, pieceSquare }) => ({
      fen: this.state.game.fen(),
      history: this.state.game.history({ verbose: true }),
      squareStyles: squareStyling({ pieceSquare, history })
    }));
    console.log(this.state)
    socket.emit('move', this.state);

  };

  onMouseOverSquare = square => {
    // get list of possible moves for this square
    console.log(this.state.game);
    let moves = this.state.game.moves({
      square: square,
      verbose: true
    });

    // exit if there are no moves available for this square
    if (moves.length === 0) return;

    let squaresToHighlight = [];
    for (var i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to);
    }

    this.highlightSquare(square, squaresToHighlight);
  };

  onMouseOutSquare = square => this.removeHighlightSquare(square);

  // central squares get diff dropSquareStyles
  onDragOverSquare = square => {
    this.setState({
      dropSquareStyle:
        square === "e4" || square === "d4" || square === "e5" || square === "d5"
          ? { backgroundColor: "cornFlowerBlue" }
          : { boxShadow: "inset 0 0 1px 4px rgb(255, 255, 0)" }
    });
  };

  onSquareClick = square => {
    this.setState(({ history }) => ({
      squareStyles: squareStyling({ pieceSquare: square, history }),
      pieceSquare: square
    }));

    let move = this.state.game.move({
      from: this.state.pieceSquare,
      to: square,
      promotion: "q" // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return;

    this.setState({
      fen: this.state.game.fen(),
      history: this.state.game.history({ verbose: true }),
      pieceSquare: ""
    });
  };

  onSquareRightClick = square =>
    this.setState({
      squareStyles: { [square]: { backgroundColor: "deepPink" } }
    });

  

  render() {
    const { fen, dropSquareStyle, squareStyles } = this.state;

    return this.props.children({
      squareStyles,
      position: fen,
      onMouseOverSquare: this.onMouseOverSquare,
      onMouseOutSquare: this.onMouseOutSquare,
      onDrop: this.onDrop,
      dropSquareStyle,
      onDragOverSquare: this.onDragOverSquare,
      onSquareClick: this.onSquareClick,
      onSquareRightClick: this.onSquareRightClick
    });
  }
}

export default function WithMoveValidation() {
  return (
    <div>
      <HumanVsHuman>
        {({
          position,
          onDrop,
          onMouseOverSquare,
          onMouseOutSquare,
          squareStyles,
          dropSquareStyle,
          onDragOverSquare,
          onSquareClick,
          onSquareRightClick
        }) => (
          <Chessboard
            id="humanVsHuman"
            width={320}
            position={position}
            onDrop={onDrop}
            onMouseOverSquare={onMouseOverSquare}
            onMouseOutSquare={onMouseOutSquare}
            boardStyle={{
              borderRadius: "5px",
              boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
            }}
            squareStyles={squareStyles}
            dropSquareStyle={dropSquareStyle}
            onDragOverSquare={onDragOverSquare}
            onSquareClick={onSquareClick}
            onSquareRightClick={onSquareRightClick}
          />
        )}
      </HumanVsHuman>
    </div>
  );
}

const squareStyling = ({ pieceSquare, history }) => {
  const sourceSquare = history.length && history[history.length - 1].from;
  const targetSquare = history.length && history[history.length - 1].to;

  return {
    [pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
    ...(history.length && {
      [sourceSquare]: {
        backgroundColor: "rgba(255, 255, 0, 0.4)"
      }
    }),
    ...(history.length && {
      [targetSquare]: {
        backgroundColor: "rgba(255, 255, 0, 0.4)"
      }
    })
  };
 };
// import React, { Component } from 'react';
// import Chessboard from 'chessboardjsx';
// import io from 'socket.io-client';
// import {Chess} from 'chess.js'; // Import the Chess module

// const socket = io.connect('http://localhost:8000');

// class ChessBoard1 extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       fen: 'start',
//       squareStyles: {},
//       history: [],
//       game: new Chess(),
//       room: null,
//     };

//     this.roomInput = React.createRef();
//   }

//   componentDidMount() {
//     socket.on('move', (msg) => {
//       this.setState(msg);
//     });
//   }

//   createRoom = () => {
//     const room = this.roomInput.current.value;
//     socket.emit('createRoom', room);
//     this.setState({ room });
//   };

//   joinRoom = () => {
//     const room = this.roomInput.current.value;
//     socket.emit('joinRoom', room);
//     this.setState({ room });
//   };

//   handleMove = (move) => {
//     const { game } = this.state;
//     const moveObj = game.move(move);

//     if (moveObj) {
//       this.setState(
//         {
//           fen: game.fen(),
//           history: game.history({ verbose: true }),
//           squareStyles: {},
//         },
//         () => socket.emit('move', this.state)
//       );
//     }
//   };

//   render() {
//     const { fen, squareStyles, room, game } = this.state;

//     return (
//       <div>
//         {!room ? (
//           <div>
//             <input ref={this.roomInput} placeholder="Enter Room ID" />
//             <button onClick={this.createRoom}>Create Room</button>
//             <button onClick={this.joinRoom}>Join Room</button>
//           </div>
//         ) : (
//           <div>
//             <h2>Room: {room}</h2>
//             <Chessboard
//               position={fen}
//               onDrop={({ sourceSquare, targetSquare }) => {
//                 const move = { from: sourceSquare, to: targetSquare };
//                 this.handleMove(move);
//               }}
//               squareStyles={squareStyles}
//             />
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default ChessBoard1;

