export interface IProfile {
  id: string;
  name: string;
  password: string | null;
  require_password: boolean;
}

export interface ISSH {
  id: string;
  profile_id: string;
  name: string;
  host: string;
  desciption: string;
}
