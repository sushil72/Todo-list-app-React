import React from "react";

function Navbar() {
  return (
    <nav>
      <div className="flex justify-between p-4 bg-gray-700">
        <div className="mx-5">
          <p className="text-xl font-bold text-white">Daily planner</p>
        </div>
        <ul className="text-white flex gap-2 mx-4">
          <li>Home</li>
          <li>Your Task</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
