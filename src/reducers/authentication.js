const initialState = {
  user: null,
  popupVisible: false,
  surfSessionToken: 'Not Logged In',
  signInOutCaption: "SIGN IN",
  tpToken: '',
  message: '',
  uid: 'Not Logged In',
  isAuthenticated: false,
  isLoggedIn: false,
  isNewProUser: false,
}

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_LOGIN_POPUP':
      return { ...state,
        popupVisible: !state.popupVisible,
        message: action.message
      }
    case 'TOGGLE_SIGNUP_POPUP':
      return { ...state,
        popupVisible: !state.popupVisible,
        message: action.message
      }
    case 'LOGIN_MODE':
      return { ...state,
        logInMode: action.logInMode
      }
    case 'USER_LOGGED_IN':
      return { ...state,
        popupVisible: false,
        signInOutCaption: 'SIGN OUT',
        user: action.user,
        uid: action.uid,
        surfSessionToken: action.surfSessionToken,
        tpToken: action.tpToken, 
        isLoggedIn: action.isLoggedIn
      }
    case 'LOG_OUT_USER':
      window.SURF.signout({});
      return state;
    case 'USER_SIGNED_OUT':
      return { ...state,
        signInOutCaption: 'SIGN IN',
        isLoggedIn: false,
        user: action.user,
        surfSessionToken: action.surfSessionToken,
        message: action.message,
        uid: action.uid,
        tpToken: action.tpToken,
      }
    case 'PIANO_USERREF':
      return { ...state,
        tpToken: action.tpToken
      }
    case 'IS_AUTHENTICATED':
      return { ...state,
        isAuthenticated: action.isAuthenticated
      }
    case 'IS_NEW_PRO_USER': 
      return { ...state,
        isNewProUser: action.newProUser
      }
    default:
      return state;
  }
}

export default authentication;
