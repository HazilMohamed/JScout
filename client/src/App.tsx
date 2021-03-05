import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import MatchAnalysis from "./containers/MatchAnalysis";
import Home from "./containers/Home";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/match" component={MatchAnalysis} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
