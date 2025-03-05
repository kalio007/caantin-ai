import React, { useState } from "react";
import { useSidebarContext } from "@/hooks/use-sidebar";

export const GreetingForm: React.FC = () => {
  const [greeting, setGreeting] = useState("");
  const { activeForm } = useSidebarContext();

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Greeting Node</h3>
      <textarea
        value={greeting}
        onChange={(e) => setGreeting(e.target.value)}
        placeholder="Enter your greeting..."
        className="w-full h-32 p-2 border rounded-md"
      />
      <div className="mt-4 flex justify-end">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={() => {
            // Add your save/submit logic here
            console.log("Greeting saved:", greeting);
          }}
        >
          Save Greeting
        </button>
      </div>
    </div>
  );
};
