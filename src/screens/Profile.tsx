import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { invoke } from "@tauri-apps/api/tauri";
import { ISSH } from "../@types/model.types";
import Button from "../components/Button";
import Storage from "../lib/Storage";

function Profile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ipAddresses, setIPAddresses] = useState<ISSH[]>([]);
  useEffect(() => {
    if (!id) return;

    Storage.getSSH(id).then((ssh) => setIPAddresses(ssh));
  }, [id]);

  const handleConnectButton = (ip: string) => {
    invoke("ssh", { address: ip });
  };

  const handleDeleteProfileButton = () => {
    console.log(id);
    Storage.deleteProfile(id as string).then(() => navigate(-1));
  };

  return (
    <div className="flex justify-center items-center  flex-col gap-4">
      {ipAddresses.length === 0 ? (
        <div className="flex justify-center items-center  flex-col gap-4">
          <span className="text-lg text-red-500">Profile is empty</span>
          <Button onClick={() => navigate(`/profile/${id}/add`)}>
            Add new address
          </Button>
          <Button onClick={handleDeleteProfileButton}>Delete profile</Button>
        </div>
      ) : (
        <div className="">
          {ipAddresses.map((addr) => {
            return (
              <div
                key={addr.id}
                className="flex gap-8 justify-center items-center"
              >
                <div>{addr.name}</div>
                <div>{addr.host}</div>
                <Button onClick={() => handleConnectButton(addr.host)}>
                  connect
                </Button>
              </div>
            );
          })}
          <div className="mt-4 w-1/2">
            <Button onClick={handleDeleteProfileButton}>Delete profile</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
