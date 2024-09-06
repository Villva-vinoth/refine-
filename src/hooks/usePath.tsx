import { useState, useEffect } from "react";

export function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("pushState", handleLocationChange);
    window.addEventListener("replaceState", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("pushState", handleLocationChange);
      window.removeEventListener("replaceState", handleLocationChange);
    };
  }, []);

  return pathname;
}


