import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import z, { ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { PublicRoutes } from "../../models/routes.model";
import Navbar from "../../components/Navbar";
import LoginSchema from "../../models/schemas/login.model";
import Field from "../../components/InputField";
import Input from "../../components/InputField";
import axiosInstance from "../../utils/axiosInstance";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { notifySuccess } from "../../utils/toastFunctions";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const [error, setError] = useState("");

  const { user, login } = useAuth();

  const navigate = useNavigate();

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

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const submitData = async (data: LoginSchema) => {
    try {
      setError("");

      const response = await axiosInstance.post("/users/login", {
        email: data.email,
        password: data.password,
      });

      const { token, message, user } = response.data;

      localStorage.setItem("token", token);
      login(user);
      notifySuccess(message);
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
    }
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
              <Field
                type="password"
                {...register("password")}
                error={errors.password?.message}
                placeholder="Contraseña"
              ></Field>
              {error && <p className="error-msg pt-0">{error}</p>}
              <button type="submit" className="btn-primary">
                Iniciar sesión
              </button>
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
