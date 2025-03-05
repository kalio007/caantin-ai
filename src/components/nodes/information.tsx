import React, { useState } from "react";
import { useSidebarContext } from "@/hooks/use-sidebar";

export const InformationForm: React.FC = () => {
  const [information, setInformation] = useState("");
  const { activeForm } = useSidebarContext();

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Information Form</h3>
      <textarea
        value={information}
        onChange={(e) => setInformation(e.target.value)}
        placeholder="Enter additional information..."
        className="w-full h-32 p-2 border rounded-md"
      />
      <div className="mt-4 flex justify-end">
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
          onClick={() => {
            // Add your save/submit logic here
            console.log("Information saved:", information);
          }}
        >
          Save Information
        </button>
      </div>
    </div>
  );
};
