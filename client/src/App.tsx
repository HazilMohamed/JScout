import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import MatchAnalysis from "./components/matchAnalysis";
import Home from "./components/home";

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
