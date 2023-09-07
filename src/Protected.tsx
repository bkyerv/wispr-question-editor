import { useEffect, useState } from "react";
import { url } from "./utils/url";

export default function Protected() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignout() {
    setIsLoading(true);
    await fetch(url + "/signout", {
      method: "POST",
      credentials: "include",
    });

    setIsLoading(false);
  }

  async function checkSession() {
    setIsLoading(true);

    await fetch(url + "/check-session", {
      method: "GET",
      credentials: "include",
    });

    setIsLoading(false);
  }

  if (isLoading) {
    return <div>...loading</div>;
  }
  return (
    <div>
      <div>
        <button onClick={() => handleSignout()}>sign out</button>
      </div>
      <div>
        <button onClick={() => checkSession()}>check session</button>
      </div>
      <h2 className="text-xl">Protected Route</h2>
    </div>
  );
}
