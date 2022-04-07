import Database from "tauri-plugin-sql-api";
import { IProfile, ISSH } from "../@types/model.types";

let db: Database;
const load = Database.load("sqlite:app.db").then((instance) => {
  db = instance;
  return db;
});

async function getProfiles(): Promise<IProfile[]> {
  await load;
  try {
    return await db.select("SELECT * FROM profile;");
  } catch (error) {
    throw new Error("Error getting profiles");
  }
}

async function createProfile(
  id: string,
  name: string,
  password: string,
  require_password: boolean
): Promise<void> {
  try {
    if (password.length > 0) {
      await db.execute("INSERT INTO profile VALUES ($1, $2, $3,$4);", [
        id,
        name,
        password,
        require_password,
      ]);
    } else {
      await db.execute("INSERT INTO profile (id,name) VALUES ($1, $2);", [
        id,
        name,
      ]);
    }
  } catch (error) {
    throw new Error("Error creating profile");
  }
}

async function deleteProfile(id: string): Promise<void> {
  try {
    await db.execute("DELETE FROM ssh where profile_id = $1", [id]);
    await db.execute("DELETE FROM profile where id = $1", [id]);
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting profile");
  }
}

async function getSSH(profile_id: string): Promise<ISSH[]> {
  await load;
  try {
    return await db.select(
      `SELECT * FROM ssh  where profile_id = '${profile_id}'`
    );
  } catch (error) {
    console.log(error);
    throw new Error("Error getting profiles");
  }
}

async function fetchProfileByName(name: string): Promise<IProfile[]> {
  try {
    return await db.select(`SELECT * FROM profile where name = '${name}' `);
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching profile");
  }
}

async function addSSH(
  id: string,
  profile_id: string,
  name: string,
  host: string,
  description: string
): Promise<void> {
  console.log({ id, profile_id, name, host, description });
  try {
    await db.execute("INSERT into ssh VALUES ($1,$2,$3,$4,$5)", [
      id,
      profile_id,
      name,
      host,
      description,
    ]);
  } catch (error) {
    console.log(error);
    throw new Error("Error adding ssh");
  }
}

export default {
  getProfiles,
  createProfile,
  getSSH,
  addSSH,
  deleteProfile,
  fetchProfileByName,
};
