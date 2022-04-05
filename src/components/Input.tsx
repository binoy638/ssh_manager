import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: string | undefined;
}

function Input({ placeholder, register, error }: InputProps) {
  return (
    <div>
      <input
        type="text"
        className="px-1 py-1 w-full rounded focus:border-green-200"
        {...register}
        placeholder={placeholder}
      />
      {error && (
        <small className="text-red-500 flex justify-start items-center">
          {error}
        </small>
      )}
    </div>
  );
}

export default Input;
