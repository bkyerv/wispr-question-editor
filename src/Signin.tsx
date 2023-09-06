import { FormEvent, useCallback, useEffect, useState } from "react";
import { DotSpinner } from "./components/Icons";
import { Navigate } from "react-router-dom";
import { url } from "./utils/url";

export default function SignIn() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkIsSignedIn = useCallback(async function () {
    const sessionId = document?.cookie
      ?.split("; ")
      ?.find((row) => row.startsWith("sessionId"))
      ?.split("=")[1];

    console.log(sessionId);

    // if (!sessionId) {
    //   console.log("no session anyway");
    //   setIsLoading(false);
    //   return;
    // }
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
  }, []);
  useEffect(() => {
    const sessionId = document?.cookie
      ?.split("; ")
      ?.find((row) => row.startsWith("sessionId"))
      ?.split("=")[1];

    if (!sessionId) {
      console.log("no session anyway");
      setIsLoading(false);
      return;
    }
    checkIsSignedIn();
  }, [checkIsSignedIn]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData);

    await (
      await fetch(url + "/signin", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
    )
      .json()
      .then(async (data) => {
        if (data && data.status === "ok") {
          await checkIsSignedIn();
        }
      })
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  }

  return isLoading ? (
    <div>...loading</div>
  ) : isSignedIn ? (
    <Navigate to="/diagnostic-area" />
  ) : (
    <div>
      {
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label>Email</label>
            <input
              autoComplete="email"
              type="email"
              name="email"
              className="border rounded p-1"
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Password</label>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              className="border rounded p-1"
              required
            />
          </div>
          <div className="text-right">
            <button className="px-2 py-1 border rounded flex gap-2 items-center">
              <span>Войти</span>
              {isLoading && <DotSpinner />}
            </button>
          </div>
        </form>
      }
    </div>
  );
}
