import Home from "./screens/Home";
import { Route, Routes } from "react-router-dom";
import ProfileCreate from "./screens/ProfileCreate";
import ProfileList from "./screens/ProfileList";
import Profile from "./screens/Profile";
import SSHAddForm from "./screens/SSHAddForm";
import Sidebar from "./components/Sidebar";
import Toolbar from "./components/Toolbar";

function App() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Toolbar />
      <div className="flex h-full ">
        <Sidebar />
        <div className="w-full  flex justify-center items-center lg:flex-[5] flex-[4]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="profile/create" element={<ProfileCreate />} />
            <Route path="profile/list" element={<ProfileList />} />
            <Route path="profile/:id" element={<Profile />} />
            <Route path="profile/:id/add" element={<SSHAddForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
