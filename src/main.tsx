import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import Protected from "./Protected.tsx";
import SignIn from "./Signin.tsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "/protected",
        element: <Protected />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
