import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";

import Navbar from "./components/Navbar";
import HomePage from "./routes/home/HomePage";
import MapPage from "./routes/map/MapPage";
import AboutPage from "./routes/about/AboutPage";
import ContactPage from "./routes/contact/ContactPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={HomePage}></Route>
          <Route path="/map" component={MapPage}></Route>
          <Route path="/about" component={AboutPage}></Route>
          <Route path="/contact" component={ContactPage}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
