import { useAuth, useClerk } from "@clerk/clerk-react";
import { Link, Outlet } from "react-router-dom";
import { DotSpinner, Spinner } from "./Icons";
import { useEffect, useState } from "react";
import { url } from "../utils/url";
import SignIn from "../Signin";

export default function Layout() {
  return (
    <div className="max-w-sm mx-auto h-screen px-2 mt-8">
      <div className="mb-8 flex gap-4">
        <Link to="/signin">Sign in</Link>
        <Link to="/protected">Protected</Link>
      </div>
      <Outlet />
    </div>
  );
}
