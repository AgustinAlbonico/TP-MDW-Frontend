import { FC, forwardRef, HTMLProps, Ref, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import LoginSchema from "../models/schemas/login.model";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

interface FieldProps extends HTMLProps<HTMLInputElement> {
  type: "email" | "password" | "text";
  error?: string;
}

// const InputField: FC<FieldProps> = ({ type, ...props }) => {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3">
//       <input
//         type={type !== "password" ? type : !showPassword ? type : "text"}
//         placeholder={type.charAt(0).toUpperCase() + type.slice(1)}
//         className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
//         {...props}
//       />
//       {type === "password" && !showPassword ? (
//         <FaRegEye
//           size={22}
//           className="text-primary cursor-pointer"
//           onClick={() => setShowPassword(!showPassword)}
//         />
//       ) : (
//         type === "password" && (
//           <FaRegEyeSlash
//             size={22}
//             className="text-slate-500 cursor-pointer"
//             onClick={() => setShowPassword(!showPassword)}
//           />
//         )
//       )}
//     </div>
//   );
// };

const Input = forwardRef((props: FieldProps, ref: Ref<HTMLInputElement>) => {
  const {error, type ,...FieldProps} = props;
  const [showPassword, setShowPassword] = useState(false);

  console.log(error, type, props)

  return (
    <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3">
      <input
        type={type !== "password" ? type : !showPassword ? type : "text"}
        placeholder={type.charAt(0).toUpperCase() + type.slice(1)}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
        ref={ref}
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
  );
});

export default Input;
