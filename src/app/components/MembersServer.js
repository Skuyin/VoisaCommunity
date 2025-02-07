"use client";
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

const MembersServer = () => {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
  const [activeTabs, setActiveTabs] = useState("Members");

  return (
    <section>
      <h2 className="my-6 text-center lg:text-9xl font-bold md:my-6 md:text-4xl text-[#000000]">
        Meet our Community
      </h2>
      {/* <ul
        onMouseLeave={() => setPosition((prev) => ({ ...prev, opacity: 0 }))}
        className="relative mx-auto flex w-fit rounded-full border-2 border-white p-1 bg-black "
      >
        {" "}
        <Tab setPosition={setPosition} setActiveTabs={setActiveTabs}>
          Members
        </Tab>
        <Cursor position={position} />
      </ul> */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTabs}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTabs === "Members" && <OnlineMembers />}

          {/* {activeTabs === "Teams" && <Teams />} */}
            {/* {activeTabs === "Leaderboards" && <Teams />}
            {activeTabs === "Members" && <Teams />} */}
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

// const Cursor = ({ position }) => {
//   return (
//     <motion.li
//       animate={position}
//       className="absolute z-0 h-8 rounded-full bg-black md:h-16"
//     />
//   );
// };

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
      <section className="relative flex items-center justify-center h-full w-full my-28">
        <div className="font-bold text-5xl animate-pulse">Loading ⏳</div>
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

  if (!filteredMembers) {
    return (
      <div>
        {!filteredMembers && (
          <h1>Member tidak aktif atau page butuh diRefres</h1>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full flex items-center flex-col">
    
    {/* Search Input */}
    <div className="my-6">
    <input
    type="text"
    placeholder="Search members..."
    className="w-[600px] mdw-[400px] px-4 py-2 border border-gray-300 rounded-md"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    />
    </div>
    
    <div className="text-3xl md:text-xl text-[#000000] mb-5">
      <h1><span className="font-bold">Members Online</span>: {data.presence_count}</h1>
    </div>

      {/* Member List */}
      {filteredMembers.length === 0 ? (
        <div className="text-center mt-4">
          <h1 className="text-red-500 font-bold">
            Member tidak ditemukan atau tidak aktif. Coba refresh halaman.
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-y-8 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-12 w-max place-items-center">
          {filteredMembers.slice(0, visibleCount).map((i) => (
            <div
              key={i.id}
              className="flex flex-col gap-2 w-full sm:flex-row md:gap-4"
            >
              <div className="h-full flex items-center border-gray-200 rounded-lg">
                <motion.img
                  alt="team"
                  className="md:w-16 md:h-16 w-10 h-10 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src={i.avatar_url}
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 text-xs md:text-xl font-bold w-full max-w-[200px] mb-3">
                    {i.username}
                  </h2>
                  <div
                    className={`${
                      (i.status === "idle" && "bg-yellow-600") ||
                      (i.status === "dnd" && "bg-red-600") ||
                      (i.status === "online" && "bg-green-500")
                    } w-5 h-5 rounded-full flex items-center justify-between`}
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
        <motion.button
        onClick={() => setVisibleCount((prev) => prev + 20)} // Increase by 20 each time
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="relative px-6 py-3 my-6 text-sm md:text-xl font-semibold bg-[#000000] rounded-2xl text-white overflow-hidden group"
      >
        Load More
        {/* Border animasi */}
        <motion.div
          className="absolute inset-1 rounded-2xl border-2 border-transparent opacity-0 group-hover:opacity-100"
          animate={{ backgroundPosition: ["0% 50%", "300% 50%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{
            background: "linear-gradient(90deg,rgb(118, 118, 255), #80dfff)",
            backgroundSize: "300% 300%",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
          }}
        />
      </motion.button>
        </div>
      )}
    </div>
  );
};

// const Leaderboards = () => {
//   return (
//     <div className="container px-5 py-24 mx-auto">
//       <div className="flex flex-col text-center w-full mb-20">Coming Soon</div>
//     </div>
//   );
// };

// const Teams = () => {
//   return (
//     <div className="container px-5 py-24 mx-auto">
//       <div className="flex flex-col text-center w-full mb-20">Coming Soon</div>
//     </div>
//   );
// };

const teamsData = [
  {
    id: "1",
    name: "John McCulling",
    role: "Admin",
    img: "https://images.unsplash.com/photo-1567515004624-219c11d31f2e??auto=format&q=75&fit=crop&w=256",
  },
  {
    id: "2",
    name: "John McCulling",
    role: "Admin",
    img: "https://images.unsplash.com/photo-1567515004624-219c11d31f2e??auto=format&q=75&fit=crop&w=256",
  },
  {
    id: "3",
    name: "John McCulling",
    role: "Admin",
    img: "https://images.unsplash.com/photo-1567515004624-219c11d31f2e??auto=format&q=75&fit=crop&w=256",
  },
  {
    id: "4",
    name: "John McCulling",
    role: "Admin",
    img: "https://images.unsplash.com/photo-1567515004624-219c11d31f2e??auto=format&q=75&fit=crop&w=256",
  },
  {
    id: "5",
    name: "John McCulling",
    role: "Admin",
    img: "https://images.unsplash.com/photo-1567515004624-219c11d31f2e??auto=format&q=75&fit=crop&w=256",
  },
  {
    id: "6",
    name: "John McCulling",
    role: "Admin",
    img: "https://images.unsplash.com/photo-1567515004624-219c11d31f2e??auto=format&q=75&fit=crop&w=256",
  },
  {
    id: "7",
    name: "John McCulling",
    role: "Admin",
    img: "https://images.unsplash.com/photo-1567515004624-219c11d31f2e??auto=format&q=75&fit=crop&w=256",
  },
];

export default MembersServer;
