import { useEffect, useState } from "react";
import { url } from "./utils/url";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import { OutletContext, useAuth } from "./components/Layout";

export default function Protected() {
  const [isAuthenticated, setIsAuthenticated] = useAuth();
  const navigate = useNavigate();

  async function handleSignout() {
    const url = import.meta.env.PROD
      ? import.meta.env.VITE_SERVER_URL_PROD
      : import.meta.env.VITE_SERVER_URL_DEV;

    await fetch(`${url}/signout`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(({ status, message }) => {
        setIsAuthenticated(false);
        return status === "ok" && navigate("/");
      });
  }

  return (
    <div>
      <h2 className="text-xl">Protected Route</h2>
      {isAuthenticated ? (
        <div>
          <button onClick={() => handleSignout()}>sign out</button>
        </div>
      ) : (
        <div>
          <Navigate to="/" />
        </div>
      )}
    </div>
  );
}
