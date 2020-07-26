import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css"

import Header from './Components/Header'
import Main from './Components/Main'

function App() {
  return (
    <React.Fragment>
      <Header />
     <Main/>
    </React.Fragment>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
