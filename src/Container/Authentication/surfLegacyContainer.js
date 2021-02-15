/* eslint-disable no-unused-vars no-console no-debugger */
import { onUserLoggedIn, onUserSignedOut, tpUserRef } from '../../actions/authenticationActions';
import { fetchPianoToken, registerUser } from '../../utilities/AuthHelpers';
/**
 * Plain JS object, to manage SURF
 */

const SurfLegacyContainer = {
  /**
   * React component class responsible for injecting SURF and showing login/register popup modal
   * @init
   * @augments {object} authentication - authentication object, from redux store
   * @param {object} menuActions - from authentication actions
   */
  init: (authentication) => {
    window.SURF.event.bind(window.SURF.events.READY, () => {
      if (typeof window.SURF.globals.user !== 'undefined' && window.SURF.globals.user.status === 'active') {
        authentication.dispatch(onUserLoggedIn());
      } else {
        authentication.dispatch(onUserSignedOut());
      }
    });

    window.SURF.event.bind(window.SURF.events.SIGNIN, () => {
      authentication.dispatch(onUserLoggedIn());
    });

    window.SURF.event.bind(window.SURF.events.SIGNOUT, () => {
      authentication.dispatch(onUserSignedOut());
    });
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

export default SurfLegacyContainer;
