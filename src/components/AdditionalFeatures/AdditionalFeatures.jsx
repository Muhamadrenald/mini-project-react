import React from "react";
import { FaMap } from "react-icons/fa";

const AdditionalFeatures = ({ user }) => {
  return (
    <div className="space-y-8">
      {/* Google Maps */}
      <div className="overflow-hidden transition-transform transform bg-white rounded-lg shadow-2xl hover:scale-105">
        <div className="p-6">
          <h3 className="flex items-center mb-4 text-xl font-semibold text-gray-700">
            <FaMap className="mr-2 text-blue-500" />
            Location
          </h3>
          <iframe
            title="User Location"
            className="w-full h-64 rounded-lg"
            src={`https://maps.google.com/maps?q=${user.location.lat},${user.location.lng}&z=15&output=embed`}
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Aktivitas Terbaru */}
      <div className="overflow-hidden transition-transform transform bg-white rounded-lg shadow-2xl hover:scale-105">
        <div className="p-6">
          <h3 className="mb-4 text-xl font-semibold text-gray-700">
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-2 h-2 mr-2 bg-blue-500 rounded-full"></div>
              <p className="text-gray-600">Logged in 2 hours ago</p>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 mr-2 bg-green-500 rounded-full"></div>
              <p className="text-gray-600">Updated profile information</p>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 mr-2 bg-purple-500 rounded-full"></div>
              <p className="text-gray-600">Posted a new photo</p>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 mr-2 bg-orange-500 rounded-full"></div>
              <p className="text-gray-600">Completed a hiking trip</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalFeatures;
