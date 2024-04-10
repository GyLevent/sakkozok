import {
  BrowserRouter as Router,
  NavLink,
  Routes,
  Route,
} from "react-router-dom";
import { Sakkozohozzaadas } from "./Sakkozohozzaadas";
import { Szerkeztes } from "./Szerkeztes";
import { Torles } from "./Torles";
import { SakkozokPage } from "./SakkozokPage";
import { SakkozoPage } from "./SakkozoPage";
import "./App.css";

function App() {
  return (
    <Router>
      <nav className="navbar mr-auto navbar-expand-sm navbar-dark bg-dark">
        <div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={"/"}>
                <span className="nav-link">Sakkozók</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/uj-sakkozo"}>
                <span className="nav-link">Új sakkozó</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" exact element={<SakkozokPage />} />
        <Route path="/sakkozo/:chessId" exact element={<SakkozoPage />} />
        <Route path="/uj-sakkozo" exact element={<Sakkozohozzaadas />} />
        <Route
          path="/szerkeztes-sakkozo/:chessId"
          exact
          element={<Szerkeztes />}
        />
        <Route path="/torles-sakkozo/:chessId" exact element={<Torles />} />
      </Routes>
    </Router>
  );
}

export default App;
