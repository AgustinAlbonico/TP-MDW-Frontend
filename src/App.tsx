import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { SpinnerCircularFixed } from "spinners-react";
import AppRouter from "./routes/AppRouter";

const App = () => {
  return (
    <>
      <Suspense
        fallback={
          <main className="w-full h-screen flex justify-center items-center">
            <SpinnerCircularFixed color="#332B47" />
          </main>
        }
      >
        <main className="">
          <AppRouter />
        </main>
        <ToastContainer />
      </Suspense>
    </>
  );
};
export default App;
