import Image from "next/image";

const Header: React.FC = () => {
    return (
        <div className="flex justify-between items-center p-4 bg-white shadow-md">
            <input
                type="text"
                placeholder="Search Appointments"
                className="border p-2 rounded w-1/3"
            />
            <div className="flex items-center">
                <button className="bg-green-500 text-white px-4 py-2 rounded mr-4">
                    Tobi
                </button>
                <div className="flex items-center">
                    <span className="mr-2">Dr. Samuel Griff</span>
                    <Image
                        src="/path/to/profile-pic.jpg"
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;
