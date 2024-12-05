import { Suspense } from "react";
import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";
import { SpinnerCircularFixed } from "spinners-react";

const App = () => {
  return (
    <>
      <Suspense
        fallback={
          <main className="w-full h-screen flex justify-center items-center">
            <SpinnerCircularFixed color="#2B85FF" />
          </main>
        }
      >
        <main className="">
          <AppRouter />
          <ToastContainer />
        </main>
      </Suspense>
    </>
  );
};
export default App;
