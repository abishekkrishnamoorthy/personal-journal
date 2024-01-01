import { Route, Router } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/signup" element={<Signup/>}/>
      </Router>
      <Header/>
      <Login />
    </div>
  );
}

export default App;
