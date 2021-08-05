import Login from "./Components/Login/Login";
import Rooms from "./Components/Rooms/Rooms";
import Chat from "./Components/Chat/Chat";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute";

function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/" component={Login} />
        <PrivateRoute exact path="/rooms" component={Rooms} />
        <PrivateRoute exact path="/chat/:id" component={Chat} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
