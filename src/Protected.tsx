import { useEffect, useState } from "react";

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

  if (isLoading) {
    return <div>...loading</div>;
  }
  return (
    <div>
      <h2 className="text-xl">Protected Route</h2>
      {isAuthenticated ? (
        <div>You are authenticated</div>
      ) : (
        <div>You are not authenticated</div>
      )}
    </div>
  );
}
