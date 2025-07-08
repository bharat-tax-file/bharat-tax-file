import { useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-indigo-700">Welcome to your Dashboard 🎉</h1>
      <p className="text-gray-600 mt-2">Secure content only visible after login.</p>
    </div>
  );
}
