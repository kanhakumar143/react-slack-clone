import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { SignIn } from './';

function Home() {
  return <dev>Home</dev>;
}
function some() {
  return <dev>Home</dev>;
}
class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/some" component={some} />
        </Switch>
      </div>
    );
  }
}

export default App;
