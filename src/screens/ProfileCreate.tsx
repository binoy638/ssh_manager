import { useEffect, useState } from "react";
import db from "../lib/Storage";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import Button from "../components/Button";
import Input from "../components/Input";

export interface ProfileFormValues {
  profileName: string;
  password: string;
  confirmPassword: string;
}

function ProfileCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>();

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const navigate = useNavigate();

  const [requirePassword, setRequirePassword] = useState(true);

  //! hash the password
  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    const id = uuidv4();
    await db.createProfile(
      id,
      data.profileName,
      data.password,
      requirePassword
    );
    navigate("/profile/list");
  };

  return (
    <div className="h-[90vh] flex items-center justify-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-4/12 flex flex-col gap-4"
      >
        <Input
          placeholder="Profile name"
          register={register("profileName", {
            required: `Profile name is required`,
          })}
          error={errors?.profileName?.message}
        />

        {requirePassword && (
          <>
            <Input
              placeholder="Password"
              register={register("password", {
                required: `Password is required`,
              })}
              error={errors?.password?.message}
            />
            <Input
              placeholder="Confirm Password"
              register={register("confirmPassword", {
                required: `Retype password`,
              })}
              error={errors?.confirmPassword?.message}
            />
          </>
        )}

        <div className="flex justify-start items-center gap-1">
          <input
            type="checkbox"
            className="bg-red-100 border-red-300 rounded-lg  text-red-500 focus:ring-red-200 "
            checked={requirePassword}
            onChange={() => setRequirePassword(!requirePassword)}
          />
          <label className="text-sm">Enable Password Protection</label>
        </div>

        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
      </form>
    </div>
  );
}

export default ProfileCreate;
