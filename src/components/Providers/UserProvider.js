import { auth } from '../firebase';
import React, { Component, createContext } from 'react';
import { createOrGetUserProfileDocument } from '../firebase';

const initialUserState = { user: null, loading: false };
export const UserContext = createContext(initialUserState);

class UsreProvider extends Component {
  state = initialUserState;

  componentDidMount = async () => {
    /* Will be fired whenever user goes from loggedin to log out state or vice versa */
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createOrGetUserProfileDocument(userAuth);

        // Attach listener to listen to user changes in firestore
        userRef.onSnapshot((snapshot) => {
          this.setState({
            user: { uid: snapshot.id, ...snapshot.data() },
            loading: false,
          });
        });
      }
      this.setState({ user: userAuth, loading: false });
    });
  };

  render() {
    const { user, loading } = this.state;
    const { children } = this.props;
    return (
      <UserContext.Provider value={{ user, loading }}>
        {children}
      </UserContext.Provider>
    );
  }
}

export default UsreProvider;
