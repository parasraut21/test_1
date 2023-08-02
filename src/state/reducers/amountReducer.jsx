const initialState = { amount: 0, cartItems: [] , ADMIN: [],Ptheme: "default", pieceClassName: 'a',};

const reducers = (state = initialState, action) => {
  switch (action.type) {
  
              case "Ptheme":
                return { ...state, Ptheme: action.payload };
                case 'SETCLASS':
      return { ...state, pieceClassName: action.className };
    default:
      return state;
  }
};


export default reducers;