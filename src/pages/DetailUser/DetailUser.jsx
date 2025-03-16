import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dummyDataByUserId } from "../../helpers/constants";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import UserDetails from "../../components/UserDetails/UserDetails";
import AdditionalFeatures from "../../components/AdditionalFeatures/AdditionalFeatures";
import Banner from "../../components/Banner/Banner";
const DetailUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://reqres.in/api/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        const dummyData = dummyDataByUserId[id];
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
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", link: "/" },
            { label: "Users", link: "/list-users" },
            { label: `${user.first_name} ${user.last_name}`, link: null },
          ]}
        />

        {/* Banner/Header */}
        <Banner imageSrc="../../../public/wallpaper.png" altText="Banner" />

        {/* Grid Layout untuk Detail Pengguna dan Fitur Tambahan */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Kolom Kiri: Detail Pengguna */}
          <UserDetails user={user} navigate={navigate} />

          {/* Kolom Kanan: Fitur Tambahan */}
          <AdditionalFeatures user={user} />
        </div>
      </div>
    </div>
  );
};

export default DetailUser;
