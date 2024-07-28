import Image from "next/image";

const RightSidebar = () => {
    return (
      <div className="bg-white w-80 h-screen p-4 shadow-md">
        <div className="flex items-center mb-6">
          <img
            src="/path/to/profile-pic.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full mr-4"
          />
          <div>
            <p>Dr. Samuel Griff</p>
            <a href="#" className="text-blue-500">View Profile</a>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Schedule Calendar</h2>
          <div className="flex justify-between items-center mb-2">
            <button>Prev</button>
            <p>Feb</p>
            <button>Next</button>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {/* Calendar Days */}
            <div className="text-center">Mon</div>
            <div className="text-center">Tue</div>
            <div className="text-center">Wed</div>
            {/* Add more days */}
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Chats</h2>
          <div className="flex items-center mb-2">
            <Image src="/path/to/chat-icon.jpg" alt="Chat" className="w-10 h-10 rounded-full mr-4" />
            <div>
              <p>St. James Seminary</p>
              <p className="text-gray-600 text-sm">Hahahaha...</p>
            </div>
          </div>
          <div className="flex items-center">
            <Image src="/path/to/chat-icon.jpg" alt="Chat" className="w-10 h-10 rounded-full mr-4" />
            <div>
              <p>Mary</p>
              <p className="text-gray-600 text-sm">Hahahaha...</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Your Forums</h2>
          <div className="mb-2">
            <p>Sexual Health</p>
            <p className="text-gray-600 text-sm">Premature Ejaculation</p>
            <p className="text-green-500">See Details</p>
          </div>
          <div>
            <p>Dental Hygiene</p>
            <p className="text-gray-600 text-sm">Premature Ejaculation</p>
            <p className="text-green-500">See Details</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default RightSidebar;