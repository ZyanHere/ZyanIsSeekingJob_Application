import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Footer from "./components/shared/Footer";
import Navbar from "./components/shared/Navbar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";


const appRouter = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  // { path: '*', component: NotFound } // This will catch all unknown routes and redirect to NotFound page.
]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter}>
        <Navbar />
        <Footer />
      </RouterProvider>
    </>
  );
}

export default App;
