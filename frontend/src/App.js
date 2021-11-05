import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import ExplorerView from './views/ExplorerView';
import LeaderboardView from './views/LeaderboardView';
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
        <Route path="/leaderboard" component={LeaderboardView}></Route>
        <Route path="/explorer" component={ExplorerView}></Route>
      </Switch>
    </Router>
  );
}

export default App;
