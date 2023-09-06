import { useAuth, useClerk } from "@clerk/clerk-react";
import { Link, Outlet } from "react-router-dom";
import { DotSpinner, Spinner } from "./Icons";
import { useEffect, useState } from "react";
import { url } from "../utils/url";

export default function Layout() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkIsSignedIn = async function () {
    const sessionId = document?.cookie
      ?.split("; ")
      ?.find((row) => row.startsWith("sessionId"))
      ?.split("=")[1];

    if (!sessionId) {
      setIsLoading(false);
      return;
    }
    const res = await fetch(url + "/auth/validate-session", {
      credentials: "include",
    });
    try {
      if (res.ok) {
        setIsSignedIn(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkIsSignedIn();
  }, [checkIsSignedIn]);

  async function signOut() {
    setIsLoading(true);
    await (
      await fetch(url + "/auth/signout", {
        method: "POST",
        credentials: "include",
      })
    )
      .json()
      .then(async (data) => {
        // if (data && data.status === "ok") {
        await checkIsSignedIn();
        // }
      })
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="max-w-sm mx-auto h-screen px-2 mt-8">
      <div className="flex flex-col gap-8">
        <div className="flex gap-2 justify-between">
          <Link to="/diagnostic-area" className="block">
            Diagnostic area
          </Link>
          {isLoading ? (
            <DotSpinner />
          ) : isSignedIn ? (
            <button
              onClick={async () => {
                setIsLoading(true);
                await signOut();
                setIsLoading(false);
              }}
              className=""
            >
              Sign out
            </button>
          ) : (
            <div className="flex gap-2">
              <Link to="/signin">Sign in</Link>
              <Link to="/signup">Sign up</Link>
            </div>
          )}
        </div>

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
