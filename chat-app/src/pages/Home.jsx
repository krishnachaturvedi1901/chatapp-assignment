import React, { useContext, useState, useEffect } from "react";
import useUserStatusSync from "../hooks/useUserStatusSync";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  useUserStatusSync();
  const [activeTab, setActiveTab] = useState("chats");
  useEffect(() => {}, []);
  return (
    <div>
      <header className="flex justify-between items-center p-4">
        <div className="header-left">
          <img src={user.avatar} alt="avatar" />
          <span>{user.fullname}</span>
        </div>
        <div className="header-right">
          <button>Logout</button>
        </div>
      </header>
      <main>
        <header className="flex justify-between items-center p-4">
          <div className="flex overflow-x-auto space-x-4 w-full">
            <div
              className={`px-4 py-2 rounded-t-lg bg-white ${
                activeTab === "chats"
                  ? "border-b-2 border-blue-500"
                  : "border-b-2 border-transparent"
              } font-semibold cursor-pointer whitespace-nowrap`}
              onClick={() => setActiveTab("chats")}
            >
              Chats
            </div>
            <div
              className={`px-4 py-2 rounded-t-lg bg-white ${
                activeTab === "contacts"
                  ? "border-b-2 border-blue-500"
                  : "border-b-2 border-transparent"
              } font-semibold cursor-pointer whitespace-nowrap`}
              onClick={() => setActiveTab("contacts")}
            >
              Contacts
            </div>
            <div
              className={`px-4 py-2 rounded-t-lg bg-white ${
                activeTab === "groups"
                  ? "border-b-2 border-blue-500"
                  : "border-b-2 border-transparent"
              } font-semibold cursor-pointer whitespace-nowrap`}
              onClick={() => setActiveTab("groups")}
            >
              Groups
            </div>
          </div>
        </header>
        {activeTab === "chats" && <div>Chats</div>}
        {activeTab === "contacts" && <div>Contacts</div>}
        {activeTab === "groups" && <div>Groups</div>}
      </main>
    </div>
  );
};

export default Home;
