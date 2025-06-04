import { UserType } from "@/types/userType";
import { useState, useEffect, useCallback } from "react";

export const useCheckAuth = () => {
  const [user, setUser] = useState<UserType>({} as UserType);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/user", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!loading && !user.id) {
      window.location.href = "/auth/login";
    }
  }, [loading, user]);

  return { user, loading };
};
