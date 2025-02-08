"use client";
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

const MembersServer = () => {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
  const [activeTabs, setActiveTabs] = useState("Online");

  return (
    <section className="mt-10" id="members">
      <h2 className="mb-4 text-center text-2xl font-bold md:mb-6 lg:text-7xl text-black">
        ANGGOTA KOMUNITAS KAMI
      </h2>
      <ul
        onMouseLeave={() => setPosition((prev) => ({ ...prev, opacity: 0 }))}
        className="relative mx-auto flex w-fit rounded-full border-2 border-black p-1"
      >
        {" "}
        <Tab setPosition={setPosition} setActiveTabs={setActiveTabs}>
          Online
        </Tab>
        <Tab setPosition={setPosition} setActiveTabs={setActiveTabs}>
          Teams
        </Tab>
        <Tab setPosition={setPosition} setActiveTabs={setActiveTabs}>
          Leaderboard
        </Tab>
        <Cursor position={position} />
      </ul>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTabs}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTabs === "Online" && (
            <div className="container px-5 py-5 mx-auto">
              <div className="flex flex-col text-center w-full mb-20">
                <OnlineMembers />
              </div>
            </div>
          )}
          {activeTabs === "Teams" && (
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-col text-center w-full mb-20">
                <TeamMembers />
              </div>
            </div>
          )}
          {activeTabs === "Leaderboard" && (
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-col text-center w-full mb-20">
                <h1>Comming Soon</h1>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

const Tab = ({ children, setPosition, setActiveTabs }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({ left: ref.current.offsetLeft, width, opacity: 1 });
      }}
      onClick={() => setActiveTabs(children)}
      className="relative z-10 cursor-pointer px-3 py-1.5 text-sm uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-4xl"
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-8 rounded-full bg-black md:h-16"
    />
  );
};

const OnlineMembers = () => {
  const [data, setData] = useState(null);
  const [visibleCount, setVisibleCount] = useState(20); // Start with 20 members
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(
        "https://discord.com/api/guilds/1234390981470715954/widget.json"
      );
      const dataServer = await res.json();
      setData(dataServer);
    }

    fetchPosts();
  }, []);

  if (!data) {
    return (
      <section className="flex flex-col items-center justify-center h-full">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 mt-2">Loading members...</p>
      </section>
    );
  }

  // Sort members by username
  const sortedMembers = data.members.sort((a, b) =>
    a.username.localeCompare(b.username)
  );

  // Filter members based on search query
  const filteredMembers = sortedMembers.filter((member) =>
    member.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col mx-auto justify-center mt-2">
      <h1 className="lg:text-xl sm:text-md font-bold text-gray-800">
        Members Online ({data.presence_count})
      </h1>

      {/* Search Input */}
      <div className="mt-2">
        <input
          type="text"
          placeholder="Search members..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Member List */}
      {filteredMembers.length === 0 ? (
        <div className="text-center mt-4">
          <h1 className="text-red-500 font-bold">
            No members found. Try refreshing the page.
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:gap-y-2 sm:gap-x-2 lg:grid-cols-4 gap-x-4 gap-y-4 mt-4">
          {filteredMembers.slice(0, visibleCount).map((i) => (
            <div
              key={i.id}
              className="flex flex-col gap-2 w-full sm:flex-row md:gap-4 rounded-lg p-2"
            >
              <div className="h-full flex  items-center border-gray-200 rounded-lg">
                <motion.img
                  alt="team"
                  className="md:w-16 md:h-16 w-10 h-10 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src={i.avatar_url}
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 text-xs md:text-xl font-bold sm:truncate w-full max-w-[150px]">
                    {i.username}
                  </h2>
                  <div
                    className={`${
                      (i.status === "idle" && "bg-yellow-600") ||
                      (i.status === "dnd" && "bg-red-600") ||
                      (i.status === "online" && "bg-green-500")
                    } w-5 h-5 rounded-full flex items-center`}
                  >
                    <span className="ml-6 text-xs font-semibold">
                      {(i.status === "idle" && "Idle") ||
                        (i.status === "dnd" && "Busy") ||
                        (i.status === "online" && "Online")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Load More Button */}
      {visibleCount < filteredMembers.length && (
        <div className="text-center mt-6">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={() => setVisibleCount((prev) => prev + 20)} // Increase by 20 each time
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

const TopMembers = () => {
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState("voice_time");
  const [searchQuery, setSearchQuery] = useState(""); // Untuk search
  const [visibleCount, setVisibleCount] = useState(10); // Untuk Load More

  useEffect(() => {
    fetch("/api/leveling")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  // **Fungsi Konversi Voice Time**
  const convertTime = (seconds) => {
    if (isNaN(seconds) || seconds <= 0) return "00:00:00";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      remainingSeconds.toString().padStart(2, "0"),
    ].join(":");
  };

  if (!data || data.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center h-full">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 mt-2">Loading members...</p>
      </section>
    );
  }

  // Sorting Data Berdasarkan Pilihan User
  const sortedData = [...data]
    .sort((a, b) => b[sortBy] - a[sortBy])
    .filter((item) =>
      item.username.toLowerCase().includes(searchQuery.toLowerCase())
    ); // Filter berdasarkan search

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">
        📊 Top Members By{" "}
        {(sortBy === "voice_time" && "Waktu Voice") ||
          (sortBy === "poin" && "Poin") ||
          (sortBy === "message_count" && "Pesan")}
      </h1>

      {/* Filter Sorting & Search Bar */}
      <div className="mb-4 flex justify-between">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="🔍 Search username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-1 border rounded-lg bg-white text-gray-700 shadow-sm w-1/2"
        />

        {/* Sorting */}
        <div className="flex items-center">
          <label className="mr-2 font-medium text-gray-700">Sort By:</label>
          <select
            className="px-3 py-1 border rounded-lg bg-white text-gray-700 shadow-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="poin">Poin</option>
            <option value="message_count">Message Count</option>
            <option value="voice_time">Voice Time</option>
          </select>
        </div>
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedData.slice(0, visibleCount).map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center bg-white shadow-lg rounded-lg p-4 border-l-4 border-blue-500 transform scale-${Math.max(
              90 - index * 5,
              60
            )} transition-all`}
          >
            {/* Nomor Index */}
            <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white font-bold rounded-full">
              {index + 1}
            </div>

            {/* Konten Data */}
            <div className="mt-2 text-center">
              <h2 className="text-lg font-semibold text-gray-800">
                {item.username}
              </h2>
              <p className="text-gray-600">📝 Pesan: {item.message_count}</p>
              <p className="text-gray-600">⭐ Poin: {item.poin}</p>
              <p className="text-gray-600">
                🎤 Voice Time: {convertTime(item.voice_time)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < sortedData.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setVisibleCount((prev) => prev + 10)}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

const TeamMembers = () => {
  const teams = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1567515004624-219c11d31f2e??auto=format&q=75&fit=crop&w=256",
      name: "Nazmi",
      role: "Admin",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1567515004624-219c11d31f2e??auto=format&q=75&fit=crop&w=256",
      name: "Lev",
      role: "Admin",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1567515004624-219c11d31f2e??auto=format&q=75&fit=crop&w=256",
      name: "Riche",
      role: "Admin",
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1567515004624-219c11d31f2e??auto=format&q=75&fit=crop&w=256",
      name: "Mojok",
      role: "Admin",
    },
  ];

  return (
    <div className=" py-2 sm:py-2 lg:py-2">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Meet our Team
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-y-8 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
          {teams.map((t) => (
            <div
              key={t.id}
              className="flex flex-col items-center gap-2 sm:flex-row md:gap-4"
            >
              <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-100 shadow-lg md:h-32 md:w-32">
                <motion.img
                  src={t.img}
                  loading="lazy"
                  alt="Photo by Radu Florin"
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div>
                <div className="text-center font-bold text-indigo-500 sm:text-left md:text-lg">
                  {t.name}
                </div>
                <p className="text-center text-sm text-gray-500 sm:text-left md:text-base">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembersServer;
