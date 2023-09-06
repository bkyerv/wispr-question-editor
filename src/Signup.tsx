import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DotSpinner } from "./components/Icons";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData);

    const res = await (
      await fetch("http://localhost:8787/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      })
    )
      .json()
      .finally(() => setLoading(false));
    console.log(res);
  }

  return (
    <div>
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
            <span>Зарегистрироваться</span>
            {loading && <DotSpinner />}
          </button>
        </div>
      </form>
    </div>
  );
}
