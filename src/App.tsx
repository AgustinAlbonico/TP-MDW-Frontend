import { Suspense } from "react";
import { SpinnerCircularFixed } from "spinners-react";
import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";

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
        <main>
          <AppRouter />
          <ToastContainer />
        </main>
      </Suspense>
    </>
  );
};
export default App;
