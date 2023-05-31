import React, { Component, useState } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const pageSize = 15;
  const apiKey = process.env.NEWS_API_KEY;

  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Router>
        <NavBar />
        <LoadingBar color="#f11946" progress={progress} height={4} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
                setProgress={setProgress}
                apiKey={"de8d955c0cea4ba981ab91a5aba37f40"}
                pageSize={pageSize}
                key="ganeral"
                country="in"
                category="ganeral"
              />
            }
          ></Route>
          <Route
            exact
            path="/business"
            element={
              <News
                setProgress={setProgress}
                apiKey={"de8d955c0cea4ba981ab91a5aba37f40"}
                pageSize={pageSize}
                key="business"
                country="in"
                category="business"
              />
            }
          ></Route>
          <Route
            exact
            path="/entertainment"
            element={
              <News
                setProgress={setProgress}
                apiKey={"de8d955c0cea4ba981ab91a5aba37f40"}
                pageSize={pageSize}
                key="entertainment"
                country="in"
                category="entertainment"
              />
            }
          ></Route>
          <Route
            exact
            path="/health"
            element={
              <News
                setProgress={setProgress}
                apiKey={"de8d955c0cea4ba981ab91a5aba37f40"}
                pageSize={pageSize}
                key="health"
                country="in"
                category="health"
              />
            }
          ></Route>
          <Route
            exact
            path="/science"
            element={
              <News
                setProgress={setProgress}
                apiKey={"de8d955c0cea4ba981ab91a5aba37f40"}
                pageSize={pageSize}
                key="science"
                country="in"
                category="science"
              />
            }
          ></Route>
          <Route
            exact
            path="/sports"
            element={
              <News
                setProgress={setProgress}
                apiKey={"de8d955c0cea4ba981ab91a5aba37f40"}
                pageSize={pageSize}
                key="sports"
                country="in"
                category="sports"
              />
            }
          ></Route>
          <Route
            exact
            path="/technology"
            element={
              <News
                setProgress={setProgress}
                apiKey={`de8d955c0cea4ba981ab91a5aba37f40`}
                pageSize={pageSize}
                key="technology"
                country="in"
                category="technology"
              />
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
