import { useEffect } from "react";

const SESSION_TIMEOUT = 60 * 1000;

function SessionTimeout({ setView }) {
  useEffect(() => {
    let timeout;

    const logoutUser = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("access_token");
      localStorage.removeItem("role");
      localStorage.removeItem("email");

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("email");

      alert("You have been logged out due to inactivity.");
      setView("login");
    };

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(logoutUser, SESSION_TIMEOUT);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, [setView]);

  return null;
}

export default SessionTimeout;