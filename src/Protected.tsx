import { useEffect, useState } from "react";
import { url } from "./utils/url";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import { OutletContext, useAuth } from "./components/Layout";
import { Spinner } from "./components/Icons";

export default function Protected() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isAuthenticated, setIsAuthenticated, authStatus] = useAuth();
  const navigate = useNavigate();

  async function handleSignout() {
    setIsLoading(true);
    const url = import.meta.env.PROD
      ? import.meta.env.VITE_SERVER_URL_PROD
      : import.meta.env.VITE_SERVER_URL_DEV;

    try {
      await fetch(`${url}/signout`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then(({ status, message }) => {
          setIsAuthenticated(false);
          return status === "ok" && navigate("/");
        });
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        setError(e);
      }
    }
  }

  if (error) {
    return (
      <div>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl">Protected Route</h2>
      {authStatus === "authenticated" ? (
        <div>
          <button
            onClick={() => handleSignout()}
            className="px-2 py-1 border rounded"
          >
            <span className="flex gap-2 items-center">
              Sign out {isLoading && <Spinner />}
            </span>
          </button>
        </div>
      ) : authStatus === "unauthenticated" ? (
        <div>
          <Navigate to="/" />
        </div>
      ) : null}
    </div>
  );
}
