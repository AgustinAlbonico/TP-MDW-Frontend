import { forwardRef, HTMLProps, Ref, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

interface FieldProps extends HTMLProps<HTMLInputElement> {
  type: "email" | "password" | "text";
  error?: string;
}

const Input = forwardRef((props: FieldProps, ref: Ref<HTMLInputElement>) => {
  const { error, type, ...FieldProps } = props;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3">
        <input
          type={type !== "password" ? type : !showPassword ? type : "text"}
          placeholder={type.charAt(0).toUpperCase() + type.slice(1)}
          className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
          ref={ref}
          {...FieldProps}
        />
        {type === "password" && !showPassword ? (
          <FaRegEye
            size={22}
            className="text-primary cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          />
        ) : (
          type === "password" && (
            <FaRegEyeSlash
              size={22}
              className="text-slate-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          )
        )}
      </div>
      {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
    </>
  );
});

export default Input;
