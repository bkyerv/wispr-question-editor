import { FormEvent, useEffect, useState } from "react";
import { DotSpinner } from "./components/Icons";
import { Navigate } from "react-router-dom";
import { url } from "./utils/url";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData);

    await fetch(url + "/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).catch((e) => console.error(e));
    setIsLoading(false);
  }

  return isLoading ? (
    <div>...loading</div>
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
              // required
            />
          </div>
          <div className="flex flex-col">
            <label>Password</label>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              className="border rounded p-1"
              // required
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
