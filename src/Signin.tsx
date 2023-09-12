import { FormEvent, useEffect, useState } from "react";
import { DotSpinner, Spinner } from "./components/Icons";
import { useNavigate } from "react-router-dom";
import { url } from "./utils/url";
import { useAuth } from "./components/Layout";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [_, setIsAuthenticated, authStatus] = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData);

    fetch(url + "/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        setIsAuthenticated(true);
        setIsLoading(false);
        return navigate("/protected");
      })
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  }

  return (
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
          <span className="flex gap-2 items-center">
            {" "}
            Войти {isLoading && <Spinner />}
          </span>
        </button>
      </div>
    </form>
  );
}
