import { useEffect, useState } from "react";
import { url } from "./utils/url";

export default function Protected() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("sessionId="))
      ?.split("=")[1];
    console.log("cookievalue", cookieValue);
    if (cookieValue) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  });

  async function handleSignout() {
    setIsLoading(true);
    await fetch(url + "/signout", {
      method: "POST",
    });
  }

  if (isLoading) {
    return <div>...loading</div>;
  }
  return (
    <div>
      <div>
        <button onClick={() => handleSignout()}>sign out</button>
      </div>
      <h2 className="text-xl">Protected Route</h2>
      {isAuthenticated ? (
        <div>You are authenticated</div>
      ) : (
        <div>You are not authenticated</div>
      )}
    </div>
  );
}
