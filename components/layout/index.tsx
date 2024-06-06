"use client";
import { AuthProvider } from "@/hooks/useAuth";
import React from "react";

export default function LayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
