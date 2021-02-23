import "./App.css";
import SignUp from "./components/SignUp/SignUp";
import View from "./components/View/View";
import RoomOption from "./components/RoomOption/RoomOption";
import Join from "./components/Join/Join";

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={RoomOption} />
        <Route path="/new" exact component={SignUp} />
        <Route path="/join" exact component={Join} />
        <Route path="/chat" component={View} />
      </Router>
    </div>
  );
}

export default App;
