import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import z, { ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { PublicRoutes } from "../../models/routes.model";
import Navbar from "../../components/Navbar";
import LoginSchema from "../../models/schemas/login.model";
import Field from "../../components/InputField";
import Input from "../../components/InputField";
import CustomLoginButton from "../../components/CustomLogin";
import { FaFacebook, FaGoogle } from "react-icons/fa";

const Login = () => {
  const loginValidation: ZodType<LoginSchema> = z.object({
    email: z.string().email("Email invalido"),
    password: z
      .string()
      .min(5, "La contraseña debe ser mayor a 5 caracteres")
      .max(30, "La contraseña debe ser menor a 30 caracteres"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginValidation),
  });

  const submitData = (data: LoginSchema) => {
    console.log(data);
  };
  return (
    <>
      <Navbar>
        <div className="flex items-center justify-center my-12">
          <div className="w-96 border rounded bg-white px-7 py-10">
            <form onSubmit={handleSubmit(submitData)}>
              <h4 className="text-2xl mb-7">Login</h4>
              <Input
                type="email"
                {...register("email")}
                error={errors.email?.message}
                placeholder="Email"
              ></Input>
              {/* 
                Cambie este input por un componente separado
                <input
                type="email"
                placeholder="Email"
                className="input-box"
                {...register("email")}
              /> */}

              <Field
                type="password"
                {...register("password")}
                error={errors.password?.message}
                placeholder="Contraseña"
              ></Field>

              {/* <input
                type="password"
                placeholder="Contraseña"
                className="input-box"
                {...register("password")}
              /> */}

              <button type="submit" className="btn-primary">
                Iniciar sesión
              </button>

              <div className="flex items-center mt-2">
                <span className="w-full h-[1px] bg-[#333333] opacity-35 rounded" />
                <p className="text-sm px-4">o</p>
                <span className="w-full h-[1px] bg-[#333333] opacity-35 rounded" />
              </div>

              <div className="flex gap-2">
                <CustomLoginButton icon={<FaGoogle size={20}/>} text="Google" />
                <CustomLoginButton icon={<FaFacebook size={20}/>} text="Facebook" />
              </div>
            </form>
            <p className="text-sm text-center mt-4">
              No tenes cuenta?{" "}
              <Link
                to={`/${PublicRoutes.REGISTER}`}
                replace
                className="text-primary"
              >
                Registrate!
              </Link>
            </p>
          </div>
        </div>
      </Navbar>
    </>
  );
};

export default Login;
