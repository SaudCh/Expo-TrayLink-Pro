import React from "react";

import AuthRoutes from "./auth";
import ClientStack from "./client";
import { useAuth } from "../hooks";

export default function xAppNavigation() {
  const { isLoggedIn = false } = useAuth();

  return <>{isLoggedIn ? <ClientStack /> : <AuthRoutes />}</>;
}
