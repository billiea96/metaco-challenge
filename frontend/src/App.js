import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import TournamentResultFormView from './views/TournamentResultFormView';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={TournamentResultFormView}></Route>
        <Route
          path="/tournament-result"
          component={TournamentResultFormView}
        ></Route>
        <Route path="/leaderboard" component={TournamentResultFormView}></Route>
        <Route path="/explorer" component={TournamentResultFormView}></Route>
      </Switch>
    </Router>
  );
}

export default App;
