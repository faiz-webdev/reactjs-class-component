import React, { Component } from "react";
import { NavBar } from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <Routes>
            <Route
              exact
              path="/"
              element={<News pageSize={5} key="ganeral" country="in" category="ganeral" />}
            ></Route>
            <Route
              exact
              path="/business"
              element={<News pageSize={5} key="business" country="in" category="business" />}
            ></Route>
            <Route
              exact
              path="/entertainment"
              element={
                <News pageSize={5} key="entertainment" country="in" category="entertainment" />
              }
            ></Route>
            <Route
              exact
              path="/health"
              element={<News pageSize={5} key="health" country="in" category="health" />}
            ></Route>
            <Route
              exact
              path="/science"
              element={<News pageSize={5} key="science" country="in" category="science" />}
            ></Route>
            <Route
              exact
              path="/sports"
              element={<News pageSize={5} key="sports" country="in" category="sports" />}
            ></Route>
            <Route
              exact
              path="/technology"
              element={<News pageSize={5} key="technology" country="in" category="technology" />}
            ></Route>
          </Routes>
          {/* <News pageSize={5} key="" country="in" category="sports" /> */}
        </Router>
      </div>
    );
  }
}
