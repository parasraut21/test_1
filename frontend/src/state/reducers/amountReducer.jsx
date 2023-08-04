const initialState = { amount: 0, cartItems: [] , ADMIN: [],Ptheme: "default", pieceClassName: 'a',messagesList: []};

const reducers = (state = initialState, action) => {
  switch (action.type) {
  
              case "Ptheme":
                return { ...state, Ptheme: action.payload };
                case 'SETCLASS':
      return { ...state, pieceClassName: action.className };
      case 'ADD_MESSAGE':
        return {
          ...state,
          messagesList: [...state.messagesList, action.payload],
        };
    default:
      return state;
  }
};


export default reducers;