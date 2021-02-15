/* eslint-disable no-unused-vars */
import { onUserLoggedIn, onUserSignedOut, tpUserRef } from '../../actions/authenticationActions';
import { fetchPianoToken, registerUser, registerNewProUser } from '../../utilities/AuthHelpers';
import { deleteCookie } from '../../utilities/Cookies';
/**
 * Plain JS object, to manage SURF
 */

const SurfWrapper = {
  /**
   * React component class responsible for injecting SURF and showing login/register popup modal
   * @init
   * @augments {object} authentication - authentication object, from redux store
   * @param {object} menuActions - from authentication actions
   */
  init: (authentication, menuActions) => {
    window.SURF.init({
      debug: false,
      element: "surfWrapper",
      responsive: true
    });

    window.SURF.event.bind(window.SURF.events.READY, () => {
      if (typeof window.SURF.globals.user !== 'undefined' &&  
        window.SURF.globals.user.status === 'active' &&
        window.SURF.globals.session ) {
        authentication.dispatch(onUserLoggedIn());
        fetchPianoToken(tpUserRef, authentication.dispatch);
      } else {
        authentication.dispatch(onUserSignedOut());
      }
    });

    window.SURF.event.bind(window.SURF.events.SIGNIN, () => {
      authentication.dispatch(onUserLoggedIn());
      fetchPianoToken(tpUserRef, authentication.dispatch);
    });

    window.SURF.event.bind(window.SURF.events.SIGNOUT, () => {
      authentication.dispatch(onUserSignedOut());
      setTimeout( () => {
        tp.push(["setUserRef", ""]);
        tp.experience.execute();
      },1000);
      deleteCookie('ispro');
    });

    window.addEventListener("message", (event) => {
      // adding event listener to trigger login popup. For example if piano needs it.
      if (authentication.user == null) {
        switch (event.data) {
          case 'TOGGLE_LOGIN_POPUP':
            authentication.dispatch(menuActions.toggleLogInPopupWindow('LogIn'));
            break;
          case 'TOGGLE_SIGNUP_POPUP':
            authentication.dispatch(menuActions.toggleSignUpPopupWindow('SignUp'));
            break;
          case 'REGISTER_NEW_PRO':
            registerNewProUser(authentication.dispatch);
            break;
          default:
            break;
        }
      }
    }, false);

  },
  updateAuthentication: (props) => {
    const auth = props.authentication;

    window.SURF.event.bind(window.SURF.events.SIGNIN, () => {
      props.dispatch(onUserLoggedIn());
      if (SURF.globals.session.uid && auth.logInMode === "signUp") {
        registerUser();
        setTimeout( () => { 
            fetchPianoToken(tpUserRef, props.dispatch);
        }, 1000);
      } 

      if (SURF.globals.session.uid && auth.logInMode === "logIn") {
        fetchPianoToken(tpUserRef, props.dispatch);
      }
    });
  }
};

export default SurfWrapper;
