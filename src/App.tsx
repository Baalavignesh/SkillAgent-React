import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import withAuth from "./HOC/withAuth";
import { PRIMARY } from "./constants/colors";
import Dashboard from "./pages/dashboard";
import Error from "./pages/error";
import { AboutPage, LoginPage, SkillRouterPage, NewSkillPage, SkillPage, DailyTracker } from "./pages";
import Register from "./pages/register";

PRIMARY;
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" Component={LoginPage} />
        <Route path="/register" Component={Register} />
        <Route path="/about" Component={withAuth(AboutPage)} />
        <Route path="/" Component={withAuth(Dashboard)} />
        <Route path="/newskill" Component={withAuth(NewSkillPage)} />
        <Route path="/skillrouter/:skill" Component={withAuth(SkillRouterPage)} />
        <Route path="/skill/:skill" Component={withAuth(SkillPage)} />
        <Route path="/skill/:skill/:day" Component={withAuth(DailyTracker)} />

        <Route path="*" Component={Error} />
      </Routes>
    </Router>
  );
}

export default App;
