import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TeamSelection from './components/TeamSelection';
import SchedulePage from './pages/SchedulePage';
import Home from './pages/Home';

const App = () => {
  return (
<Router>
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/team-selection" component={TeamSelection} />
    <Route path="/schedule/:teamId/:season" component={SchedulePage} />
  </Switch>
</Router>


  );
};

export default App;