import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-red-500">Page Not Found</p>
      <Link
        to="/"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-5"
      >
        Back to Home
      </Link>
    </div>
  );
}
