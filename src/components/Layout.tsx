import { Link, Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

export type OutletContext = [
  isAuthenticated: boolean,
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
];

export function useAuth() {
  return useOutletContext<OutletContext>();
}

export default function Layout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const url = import.meta.env.PROD
      ? import.meta.env.VITE_SERVER_URL_PROD
      : import.meta.env.VITE_SERVER_URL_DEV;

    async function validateSession() {
      try {
        const res = await fetch(`${url}/validate-session`, {
          credentials: "include",
        });
        if (!res.ok) {
          navigate("/");
          return;
        }

        const { status, message } = await res.json();
        if (status === "ok") {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (e) {
        console.error(e);
      }
    }
    validateSession();
    setIsLoading(false);
  }, []);

  return (
    <div className="max-w-sm mx-auto h-screen px-2 mt-8">
      {isLoading ? (
        <div>...isLoading</div>
      ) : (
        <>
          <div className="mb-8 flex gap-4">
            <Link to="/">Sign in</Link>
            <Link to="/protected">Protected</Link>
          </div>
          <Outlet context={[isAuthenticated, setIsAuthenticated]} />
        </>
      )}
    </div>
  );
}
