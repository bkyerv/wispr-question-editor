import { FormEvent, useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { DotSpinner } from "./components/Icons";
import { url } from "./utils/url";

export default function DiagnosticArea() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkIsSignedIn = useCallback(async function () {
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
  }, []);

  useEffect(() => {
    checkIsSignedIn();
  }, [checkIsSignedIn]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { name, description } = Object.fromEntries(formData);
  }

  if (isLoading) {
    return <DotSpinner />;
  }

  if (!isSignedIn) {
    return <Navigate to="/signin" />;
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <label htmlFor="name" className="flex gap-2 justify-between">
        Name
        <input
          type="text"
          id="name"
          name="name"
          className="border rounded px-2"
        />
      </label>
      <label htmlFor="description" className="flex gap-2 justify-between">
        Description
        <input
          type="text"
          id="description"
          name="description"
          className="border rounded px-2"
        />
      </label>
      <div className="text-right">
        <button className="px-3 py-2 border rounded">добавить</button>
      </div>
    </form>
  );
}
