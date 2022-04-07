import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import db from "../lib/Storage";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import Button from "../components/Button";
import Input from "../components/Input";

export interface SSHFormValues {
  name: string;
  host: string;
  description: string;
}

function SSHAddForm() {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SSHFormValues>();

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SSHFormValues> = async (data) => {
    const uuid = uuidv4();
    await db.addSSH(uuid, id as string, data.name, data.host, data.description);
    navigate(`/profile/${id}`);
  };

  return (
    <div className=" flex items-center justify-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-4/12 flex flex-col gap-4"
      >
        <Input
          placeholder="Name"
          register={register("name", { required: "Provide a name" })}
          error={errors?.name?.message}
          type="text"
        />

        <Input
          type="text"
          placeholder="Host IP"
          register={register("host", {
            required: "Host IP is required",
            pattern: {
              value: /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/,
              message: "invalid ip address",
            },
          })}
          error={errors?.host?.message}
        />

        <Input
          type="text"
          placeholder="Description"
          register={register("description")}
          error={errors?.description?.message}
        />

        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
      </form>
    </div>
  );
}

export default SSHAddForm;
