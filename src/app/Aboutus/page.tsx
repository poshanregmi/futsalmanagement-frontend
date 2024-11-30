import React from "react";

const AboutUsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">About Us</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Welcome to <span className="font-semibold">Futsal Arena</span>, your
          comprehensive solution for all things futsal! Whether you are an avid
          player, coach, or facility manager, we are here to provide you with
          the best services to enhance your futsal experience.
        </p>
        <h3 className="text-2xl font-semibold text-blue-500 mb-3">
          Our Vision
        </h3>
        <p className="text-gray-700 leading-relaxed">
          We aim to foster a thriving futsal community at local, regional, and
          national levels, promoting growth and excellence in the sport.
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;
