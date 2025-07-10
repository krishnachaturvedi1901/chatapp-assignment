// AuthContext.jsx or a custom hook
import React, { useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { config } from "../config/config";

const useUserStatusSync = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.email) return;

    // Set online when component mounts (user logs in or page loads)
    axios.patch(`${config.baseUrl}/users/status`, {
      _id: user._id,
      email: user.email,
      status: "online",
    });

    // Set offline on tab/window close
    const handleBeforeUnload = () => {
      // Use sendBeacon for reliability
      navigator.sendBeacon(
        `${config.baseUrl}/users/status`,
        JSON.stringify({ email: user.email, status: "offline" })
      );
    };

    // Optionally: Set online/offline on focus/blur
    const handleFocus = () => {
      axios.patch(`${config.baseUrl}/users/status`, {
        _id: user._id,
        email: user.email,
        status: "online",
      });
    };
    const handleBlur = () => {
      axios.patch(`${config.baseUrl}/users/status`, {
        _id: user._id,
        email: user.email,
        status: "offline",
      });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    // Cleanup
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, [user?.email]);
};

export default useUserStatusSync;
