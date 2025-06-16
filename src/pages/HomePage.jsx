import React, { useState } from "react";
import { FiRefreshCw,  FiCalendar, FiDroplet, FiSun, FiUmbrella } from "react-icons/fi";

import imageTickets from '../assets/img/Tickets.png';
import imageWristbands from '../assets/img/Wristbands.png';
import imageLocker from '../assets/img/Locker.png';
import imageFood from '../assets/img/Food Items.png';
import imageSouvenirs from '../assets/img/Souvenirs.png';
import imageCostumes from '../assets/img/Costumes.png';


const HomePage = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("today");
  
const metrics = [
  { title: "Total Tickets", amount: 1242, trend: "up", icon: imageTickets, color: "from-blue-400 to-cyan-300" },
  { title: "Wristbands", amount: 856, trend: "up", icon: imageWristbands, color: "from-green-400 to-teal-300" },
  { title: "Locker Rentals", amount: 342, trend: "down", icon: imageLocker, color: "from-purple-400 to-indigo-300" },
  { title: "Food Items", amount: 1289, trend: "up", icon: imageFood, color: "from-yellow-400 to-amber-300" },
  { title: "Souvenirs", amount: 567, trend: "steady", icon: imageSouvenirs, color: "from-pink-400 to-rose-300" },
  { title: "Costumes", amount: 412, trend: "up", icon: imageCostumes, color: "from-orange-400 to-yellow-300" },
];




  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Mock data for charts
  const visitorData = [12, 19, 3, 5, 2, 3, 15, 22, 8, 10];
  const slideData = [5, 12, 7, 15, 10, 8, 6, 14, 9, 11];
  const foodData = [2, 5, 3, 8, 4, 7, 6, 9, 5, 4];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6 text-blue-900">
      {/* Header with waterpark theme */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-500">
            SplashDash
          </h1>
          <p className="text-blue-600/80">Waterpark Management System</p>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleRefresh}
            className="flex items-center px-4 py-2 bg-white rounded-full border-2 border-blue-200 hover:bg-blue-50 transition-all"
          >
            <FiRefreshCw
              className={`mr-2 text-blue-500 ${
                isRefreshing ? "animate-spin" : ""
              }`}
            />
            <span className="text-blue-700">Refresh</span>
          </button>

          <div className="relative">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="appearance-none px-4 py-2 bg-white rounded-full border-2 border-blue-200 hover:bg-blue-50 transition-all pr-8 text-blue-700"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            <FiCalendar className="absolute right-3 top-2.5 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button className="px-6 py-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-lg hover:shadow-blue-200 transition-all flex items-center hover:scale-[1.03] text-white">
          <FiDroplet className="mr-2" />
          Check Today's Visitors
        </button>

        <button className="px-6 py-3 bg-gradient-to-r from-teal-400 to-green-400 rounded-full shadow-lg hover:shadow-teal-200 transition-all flex items-center hover:scale-[1.03] text-white">
          <FiUmbrella className="mr-2" />
          Attraction Status
        </button>

        <button className="px-6 py-3 bg-gradient-to-r from-pink-600 to-blue-600 rounded-full shadow-lg hover:shadow-pink-400 transition-all flex items-center hover:scale-[1.03] text-white">
          <FiSun className="mr-2" />
          Weather Report
        </button>
      </div>

      {/* Metric Cards - Now with water-themed colors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {metrics.map((item, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-2xl p-6 border-2 border-blue-100 hover:border-${
              item.color.split(" ")[0].split("-")[1]
            }-300 transition-all hover:-translate-y-1 hover:shadow-lg`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-600/80 text-sm">{item.title}</p>
                <p className="text-3xl font-bold mt-1 text-blue-800">
                  {item.amount}
                </p>
              </div>
              
              <div className={`p-3 rounded-full bg-gradient-to-br ${item.color}`}>
                 <img src={item.icon} alt={item.title} className="w-20 h-20 object-contain" />
              </div>

            </div>
            <div className="mt-4 flex items-center">
              <div
                className={`w-3 h-3 rounded-full mr-2 ${
                  item.trend === "up"
                    ? "bg-green-400"
                    : item.trend === "down"
                    ? "bg-red-400"
                    : "bg-yellow-400"
                }`}
              ></div>
              <span className="text-xs text-blue-600/70">
                {item.trend === "up"
                  ? "↑ 12% from yesterday"
                  : item.trend === "down"
                  ? "↓ 5% from yesterday"
                  : "↔ No change"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts/Boxes - Water-themed */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Visitor Chart */}
        <div className="bg-white rounded-2xl p-6 border-2 border-blue-100 hover:border-blue-300 transition-all">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-blue-800">
              Visitor Flow
            </h2>
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
              Live
            </span>
          </div>
          <div className="h-48 relative">
            <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end h-full">
              {visitorData.map((value, i) => (
                <div
                  key={i}
                  style={{ height: `${value * 5}px` }}
                  className="w-4 bg-gradient-to-t from-blue-400 to-cyan-300 rounded-t-full mx-0.5 transition-all duration-500"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Slide Usage */}
        <div className="bg-white rounded-2xl p-6 border-2 border-teal-100 hover:border-teal-300 transition-all">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-teal-800">
              Slide Popularity
            </h2>
            <span className="text-xs bg-teal-100 text-teal-600 px-2 py-1 rounded-full">
              Updated
            </span>
          </div>
          <div className="h-48 relative">
            <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end h-full">
              {slideData.map((value, i) => (
                <div
                  key={i}
                  style={{ height: `${value * 5}px` }}
                  className="w-4 bg-gradient-to-t from-teal-400 to-green-300 rounded-t-full mx-0.5 transition-all duration-500"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Food Sales */}
        <div className="bg-white rounded-2xl p-6 border-2 border-pink-100 hover:border-pink-300 transition-all">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-blue-800">
              Snack Bar Sales
            </h2>
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
              Trending
            </span>
          </div>
          <div className="h-48 relative">
            <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end h-full">
              {foodData.map((value, i) => (
                <div
                  key={i}
                  style={{ height: `${value * 10}px` }}
                  className="w-4 bg-gradient-to-t from-pink-400 to-pink-300 rounded-t-full mx-0.5 transition-all duration-500"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity - Now with water-themed icons */}
      <div className="mt-8 bg-white rounded-2xl p-6 border-2 border-blue-100">
        <h2 className="text-lg font-semibold mb-4 text-blue-800">
          Recent Activities
        </h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center p-3 hover:bg-blue-50 rounded-xl transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center mr-4 text-white">
                {item === 1 ? "🏊" : item === 2 ? "🎢" : "🍔"}
              </div>
              <div className="flex-1">
                <p className="font-medium text-blue-800">
                  {item === 1
                    ? "New family pass purchased"
                    : item === 2
                    ? "ThunderSlide queue cleared"
                    : "New snack bar record!"}
                </p>
                <p className="text-sm text-blue-600/70">
                  {item === 1
                    ? "5 minutes ago"
                    : item === 2
                    ? "22 minutes ago"
                    : "1 hour ago"}
                </p>
              </div>
              <button className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-full transition-all">
                View
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Fun Waterpark Footer */}
      <div className="mt-8 text-center text-blue-600/70 text-sm">
        <p>
          SplashDash Waterpark Management • Making waves in park operations! 🌊
        </p>
      </div>
    </div>
  );
};

export default HomePage;