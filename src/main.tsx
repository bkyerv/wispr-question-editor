import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import DiagnosticArea from "./DiagnosticArea.tsx";
import SignIn from "./Signin.tsx";
import SignUp from "./Signup.tsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      { path: "signup", element: <SignUp /> },
      {
        path: "/diagnostic-area",
        element: <DiagnosticArea />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
