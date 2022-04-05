// With the Tauri API npm package:

import { useEffect, useState } from "react";
import Sqlite from "../lib/Storage";

import ProfileCreateForm from "./ProfileCreate";
import ProfileList from "./ProfileList";

function Home() {
  // const [loading, setLoading] = useState(true);

  const [firstLogin, setFirstLogin] = useState(false);

  useEffect(() => {
    const fetchProfiles = async () => {
      const profiles = await Sqlite.getProfiles();
      if (profiles.length > 0) {
        setFirstLogin(false);
      } else {
        setFirstLogin(true);
      }
    };

    fetchProfiles();
  }, []);

  const handleClick = () => {
    // invoke("ssh", { address: "140.238.251.209" });
  };
  return <div>{firstLogin ? <ProfileCreateForm /> : <ProfileList />}</div>;
}

export default Home;
