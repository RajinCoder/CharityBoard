import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import UserLoginPage from "./pages/User/UserLoginPage";
import UserSignUpPage from "./pages/User/UserSignUpPage";
import UserOrg from "./pages/UserOrg";
import OrgLoginPage from "./pages/Organization/OrgLoginPage";
import OrgSignUpPage from './pages/Organization/OrgSignUpPage';
import FavoritesPage from './pages/Favorites-page.tsx'
import FollowingPage from "./pages/FolllowingPage";


function App() {
  return (
    <div className="h-100">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user-login" element={<UserLoginPage />} />
        <Route path="/user-signup" element={<UserSignUpPage />} />
        <Route path="/organization-login" element={<OrgLoginPage />} />
        <Route path="/organization-signup" element={<OrgSignUpPage />} />
        <Route path="/user-or-org" element={<UserOrg />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/following" element={<FollowingPage />} />
      </Routes>
    </div>
  );
}

export default App;
