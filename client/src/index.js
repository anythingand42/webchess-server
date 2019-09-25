import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
// import { BrowserRouter as Router, Route } from "react-router-dom";

// function Root() {
//     return (
//         <Router>
//             <div>
//                 <Route exact path="/" component={Main} />
//                 <Route path="/play" component={Main} />
//                 <Route path="/login" component={Main} />
//             </div>
//         </Router>
//     );
// }

ReactDOM.render(<App />, document.getElementById("root"));