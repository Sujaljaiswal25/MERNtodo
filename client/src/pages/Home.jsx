import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to Task Manager
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Organize your tasks efficiently with our modern task management
            system
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-50 transition border-2 border-indigo-600"
            >
              Sign Up
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-indigo-600 text-4xl mb-4">✓</div>
              <h3 className="text-lg font-semibold mb-2">Easy Task Creation</h3>
              <p className="text-gray-600">
                Create and organize your tasks with just a few clicks
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-indigo-600 text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold mb-2">Real-time Updates</h3>
              <p className="text-gray-600">
                Track your task progress in real-time
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-indigo-600 text-4xl mb-4">🔒</div>
              <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your data is encrypted and protected
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
