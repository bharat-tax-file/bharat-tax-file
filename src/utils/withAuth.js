import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const withAuth = (WrappedComponent) => {
  return function ProtectedComponent(props) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setAuthenticated(true);
        } else {
          router.replace("/login"); // redirect if not logged in
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }, [router]);

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return authenticated ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
