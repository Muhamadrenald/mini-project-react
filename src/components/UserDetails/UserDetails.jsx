import React from "react";
import {
  FaBirthdayCake,
  FaMapMarkerAlt,
  FaPhone,
  FaHeart,
  FaUserGraduate,
  FaHiking,
} from "react-icons/fa";

const UserDetails = ({ user, navigate }) => {
  return (
    <div className="overflow-hidden transition-transform transform bg-white rounded-lg shadow-2xl lg:col-span-2 hover:scale-105">
      <div className="p-6 text-center">
        <img
          src={user.avatar}
          alt={user.first_name}
          className="w-32 h-32 mx-auto mb-4 border-4 border-white rounded-full shadow-lg"
        />
        <h2 className="text-3xl font-bold text-gray-800">
          {user.first_name} {user.last_name}
        </h2>
        <p className="text-gray-500">{user.email}</p>
      </div>

      {/* Informasi Tambahan */}
      <div className="p-6 bg-gray-50">
        <h3 className="mb-4 text-xl font-semibold text-gray-700">
          Additional Information
        </h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <FaUserGraduate className="mr-2 text-blue-500" />
            <p className="text-gray-600">
              <strong>Major:</strong> {user.major}
            </p>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-2 text-green-500" />
            <p className="text-gray-600">
              <strong>Address:</strong> {user.address}
            </p>
          </div>
          <div className="flex items-center">
            <FaPhone className="mr-2 text-purple-500" />
            <p className="text-gray-600">
              <strong>Phone:</strong> {user.phone}
            </p>
          </div>
          <div className="flex items-center">
            <FaBirthdayCake className="mr-2 text-pink-500" />
            <p className="text-gray-600">
              <strong>Birthdate:</strong> {user.birthdate}
            </p>
          </div>
          <div className="flex items-center">
            <FaHeart className="mr-2 text-red-500" />
            <p className="text-gray-600">
              <strong>Relationship:</strong> {user.relationship}
            </p>
          </div>
          <div className="flex items-center">
            <FaHiking className="mr-2 text-orange-500" />
            <p className="text-gray-600">
              <strong>Hobbies:</strong> {user.hobbies.join(", ")}
            </p>
          </div>
        </div>
      </div>

      {/* Tombol Kembali */}
      <div className="p-6 text-center">
        <button
          className="px-6 py-2 text-white transition-all bg-blue-500 rounded-lg hover:bg-blue-600"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
