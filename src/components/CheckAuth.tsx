"use client";

import { User } from "@/types/prisma";
import React, { useEffect, useState } from "react";

export default function CheckAuth({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/account", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Important for cookies/session
        });

        if (!response.ok) {
          console.log("Auth check failed:", response.statusText);
        }

        const userData = await response.json();
        console.log("User data:", userData);
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Auth check failed:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return <div>{children}</div>;
}
