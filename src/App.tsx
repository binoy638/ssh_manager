// With the Tauri API npm package:
import Home from "./screens/Home";
import { Route, Routes } from "react-router-dom";
import ProfileCreate from "./screens/ProfileCreate";
import ProfileList from "./screens/ProfileList";
import Profile from "./screens/Profile";
import { useNavigate } from "react-router-dom";
import SSHAddForm from "./screens/SSHAddForm";
// With the Tauri global script, enabled when `tauri.conf.json > build > withGlobalTauri` is set to true:

function App() {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-200 h-screen w-screen">
      <button onClick={() => navigate(-1)}>Back</button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile/create" element={<ProfileCreate />} />
        <Route path="profile/list" element={<ProfileList />} />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="profile/:id/add" element={<SSHAddForm />} />
      </Routes>
    </div>
  );
}

export default App;
