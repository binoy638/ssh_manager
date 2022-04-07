import { useMemo, useState } from "react";
import db from "../lib/Storage";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import Button from "../components/Button";
import Input from "../components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { invoke } from "@tauri-apps/api/tauri";

export interface ProfileFormValues {
  profileName: string;
  password: string;
  confirmPassword: string;
}

function ProfileCreate() {
  const navigate = useNavigate();

  const [requirePassword, setRequirePassword] = useState(true);

  const validationSchema = useMemo(() => {
    if (requirePassword) {
      return Yup.object().shape({
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .optional(),
        confirmPassword: Yup.string().oneOf(
          [Yup.ref("password")],
          "Passwords must match"
        ),
      });
    }
    return Yup.object().shape({
      password: Yup.string().optional(),
      confirmPassword: Yup.string().optional(),
    });
  }, [requirePassword]);

  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ProfileFormValues>(formOptions);

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    const profiles = await db.fetchProfileByName(data.profileName);
    const profileExists = profiles.length > 0;
    if (profileExists) {
      setError("profileName", { message: "Profile name already exists" });
      return;
    }
    const id = uuidv4();
    const hash_passowrd = await invoke("hash_password", {
      password: data.password,
    });

    if (typeof hash_passowrd !== "string") return;
    await db.createProfile(
      id,
      data.profileName,
      hash_passowrd,
      requirePassword
    );

    navigate("/profile/list");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        placeholder="Profile name"
        register={register("profileName", {
          required: `Profile name is required`,
        })}
        error={errors?.profileName?.message}
        type="text"
      />

      {requirePassword && (
        <>
          <Input
            placeholder="Password"
            register={register("password", {
              required: `Password is required`,
            })}
            error={errors?.password?.message}
            type="password"
          />
          <Input
            placeholder="Confirm Password"
            register={register("confirmPassword", {
              required: `Retype password`,
            })}
            error={errors?.confirmPassword?.message}
            type="password"
          />
        </>
      )}

      <div className="flex justify-start items-center gap-1">
        <input
          type="checkbox"
          className="bg-red-100 border-gray-300 rounded-lg  text-gray-700 focus:ring-gray-200 "
          checked={requirePassword}
          onChange={() => setRequirePassword(!requirePassword)}
        />
        <label className="text-sm">Enable Password Protection</label>
      </div>

      <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
    </form>
  );
}

export default ProfileCreate;
