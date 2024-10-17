import { toast } from "react-toastify";

export const notifySuccess = (text: string) =>
  toast(text, {
    autoClose: 1500,
    position: "top-center",
    type: "success",
  });

export const notifyError = (text: string) =>
  toast(text, {
    autoClose: 1500,
    position: "top-center",
    type: "error",
  });
