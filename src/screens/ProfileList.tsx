import React, { useEffect, useState } from "react";
import { IProfile } from "../@types/model.types";
import { Link, useNavigate } from "react-router-dom";

import Sqlite from "../lib/Storage";
import Button from "../components/Button";

function ProfileList() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<IProfile[]>([]);
  useEffect(() => {
    const fetchProfiles = async () => {
      const profiles = await Sqlite.getProfiles();
      return profiles;
    };

    fetchProfiles().then((data) => {
      setProfiles(data);
    });
  }, []);

  return (
    <div className="flex flex-col gap-4 h-full">
      {profiles.map((profile) => {
        return (
          <div key={profile.id}>
            <Link to={`/profile/${profile.id}`}>
              <div className="bg-gray-700 px-4 py-2 flex justify-center items-center cursor-pointer rounded text-white hover:opacity-80">
                {profile.name}
              </div>
            </Link>
          </div>
        );
      })}
      <Button onClick={() => navigate("/profile/create")}>
        Create new profile
      </Button>
    </div>
  );
}

export default ProfileList;
