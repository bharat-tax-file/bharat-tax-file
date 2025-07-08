import withAuth from "@/utils/withAuth";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";

function Dashboard({ user }) {
  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-10 max-w-xl text-center">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">Dashboard</h1>
        <p className="text-gray-600 mb-6">Logged in as: <b>{user.email}</b></p>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default withAuth(Dashboard);
