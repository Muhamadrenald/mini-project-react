import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaBirthdayCake,
  FaMapMarkerAlt,
  FaPhone,
  FaHeart,
  FaUserGraduate,
  FaHiking,
  FaMap,
} from "react-icons/fa";

// Data dummy untuk semua pengguna (ID 1 hingga 12)
const dummyDataByUserId = {
  1: {
    major: "Computer Science",
    address: "1234 Main Street, Jakarta, Indonesia",
    phone: "+62 812-3456-7890",
    birthdate: "1995-05-15",
    relationship: "Single",
    hobbies: ["Hiking", "Reading", "Coding"],
    location: { lat: -6.2088, lng: 106.8456 }, // Jakarta
  },
  2: {
    major: "Business Administration",
    address: "456 Elm Street, Bandung, Indonesia",
    phone: "+62 878-1234-5678",
    birthdate: "1990-10-25",
    relationship: "Married",
    hobbies: ["Traveling", "Cooking", "Photography"],
    location: { lat: -6.9175, lng: 107.6191 }, // Bandung
  },
  3: {
    major: "Graphic Design",
    address: "789 Oak Street, Surabaya, Indonesia",
    phone: "+62 821-9876-5432",
    birthdate: "1988-03-12",
    relationship: "In a Relationship",
    hobbies: ["Drawing", "Music", "Gaming"],
    location: { lat: -7.2575, lng: 112.7521 }, // Surabaya
  },
  4: {
    major: "Mechanical Engineering",
    address: "321 Pine Street, Yogyakarta, Indonesia",
    phone: "+62 811-2233-4455",
    birthdate: "1992-07-18",
    relationship: "Single",
    hobbies: ["Cycling", "DIY Projects", "Watching Movies"],
    location: { lat: -7.7956, lng: 110.3695 }, // Yogyakarta
  },
  5: {
    major: "Psychology",
    address: "654 Birch Street, Bali, Indonesia",
    phone: "+62 812-9988-7766",
    birthdate: "1985-12-30",
    relationship: "Married",
    hobbies: ["Yoga", "Meditation", "Reading"],
    location: { lat: -8.4095, lng: 115.1889 }, // Bali
  },
  6: {
    major: "Electrical Engineering",
    address: "987 Cedar Street, Medan, Indonesia",
    phone: "+62 813-5566-7788",
    birthdate: "1993-09-22",
    relationship: "Single",
    hobbies: ["Gaming", "Coding", "Watching Anime"],
    location: { lat: 3.5952, lng: 98.6722 }, // Medan
  },
  7: {
    major: "Biology",
    address: "111 Maple Street, Makassar, Indonesia",
    phone: "+62 822-3344-5566",
    birthdate: "1991-04-14",
    relationship: "In a Relationship",
    hobbies: ["Gardening", "Bird Watching", "Hiking"],
    location: { lat: -5.1477, lng: 119.4327 }, // Makassar
  },
  8: {
    major: "Marketing",
    address: "222 Oak Street, Palembang, Indonesia",
    phone: "+62 823-4455-6677",
    birthdate: "1989-11-05",
    relationship: "Single",
    hobbies: ["Networking", "Public Speaking", "Traveling"],
    location: { lat: -2.9761, lng: 104.7754 }, // Palembang
  },
  9: {
    major: "Architecture",
    address: "333 Pine Street, Semarang, Indonesia",
    phone: "+62 824-5566-7788",
    birthdate: "1994-08-19",
    relationship: "Married",
    hobbies: ["Drawing", "Photography", "Traveling"],
    location: { lat: -6.9667, lng: 110.4167 }, // Semarang
  },
  10: {
    major: "Chemistry",
    address: "444 Elm Street, Malang, Indonesia",
    phone: "+62 825-6677-8899",
    birthdate: "1996-02-28",
    relationship: "Single",
    hobbies: ["Cooking", "Reading", "Watching Movies"],
    location: { lat: -7.9666, lng: 112.6326 }, // Malang
  },
  11: {
    major: "Physics",
    address: "555 Birch Street, Bogor, Indonesia",
    phone: "+62 826-7788-9900",
    birthdate: "1997-06-10",
    relationship: "In a Relationship",
    hobbies: ["Astronomy", "Gaming", "Reading"],
    location: { lat: -6.5944, lng: 106.7892 }, // Bogor
  },
  12: {
    major: "Mathematics",
    address: "666 Cedar Street, Surakarta, Indonesia",
    phone: "+62 827-8899-0011",
    birthdate: "1998-03-17",
    relationship: "Single",
    hobbies: ["Solving Puzzles", "Chess", "Reading"],
    location: { lat: -7.5755, lng: 110.8243 }, // Surakarta
  },
};

const DetailUser = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://reqres.in/api/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Ambil data dummy berdasarkan ID pengguna
        const dummyData = dummyDataByUserId[id] || {
          major: "Unknown",
          address: "Unknown",
          phone: "Unknown",
          birthdate: "Unknown",
          relationship: "Unknown",
          hobbies: ["Unknown"],
          location: { lat: 0, lng: 0 }, // Default location
        };

        // Gabungkan data dari API dengan data dummy
        const userData = {
          ...data.data,
          ...dummyData,
        };
        setUser(userData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <div className="p-6 text-center text-red-500">User not found!</div>;
  }

  return (
    <div className="min-h-screen py-8 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="container px-4 mx-auto">
        {/* Banner/Header */}
        <div className="w-full mb-8">
          <img
            src="../../../public/wallpaper.png"
            alt="Banner"
            className="object-cover w-full h-48 rounded-lg shadow-lg md:h-64"
          />
        </div>

        {/* Grid Layout untuk Detail Pengguna dan Fitur Tambahan */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Kolom Kiri: Detail Pengguna */}
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

          {/* Kolom Kanan: Fitur Tambahan */}
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
        </div>
      </div>
    </div>
  );
};

export default DetailUser;
