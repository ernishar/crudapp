import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Components/01-04/Home";
import AddData from "./Components/01-04/AddData";
import "bootstrap/dist/css/bootstrap.min.css";
import ListData from "./Components/01-04/ListData";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/add" element={<AddData />} />
        <Route path="/listdata" element={<ListData />} />
      </Routes>
    </Router>
  );
}

export default App;
