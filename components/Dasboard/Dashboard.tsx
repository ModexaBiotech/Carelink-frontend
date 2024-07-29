import React from 'react';
import StatsCard from "../StatCard";
import WelcomeMessage from "../WelcomeMessage";
import EducationalContent from "./EducationalContent";
import { FaCalendarCheck, FaClock, FaStar } from 'react-icons/fa';



export function Dashboard() {
    const greeting = "Good Morning"; // This should come from the backend
    const doctorName = "Samuel Griff"; // This should come from the backend
    const date = "Wednesday, 14 Feb"; // This should come from the backend

    // Define the stats data
    const stats = [
        { label: 'Total Sessions', value: 10, icon: FaCalendarCheck, color: 'bg-blue-200', textColor: 'text-blue-800' },
        { label: 'Average Duration', value: '25 min', icon: FaClock, color: 'bg-green-200', textColor: 'text-green-800' },
        { label: 'Average Rating', value: 4.6, icon: FaStar, color: 'bg-yellow-200', textColor: 'text-yellow-800' },
    ];

    return (
        <div className="flex-1 flex p-6 space-x-6 overflow-auto">
            <div className="flex-1 max-w-full lg:max-w-3xl xl:max-w-4xl space-y-6">
                <WelcomeMessage greeting={greeting} doctorName={doctorName} date={date} />
                <div>
                    <div className="flex justify-between mr-[50px] items-center">
                        <h2 className="text-xl font-bold mb-4">Statistics</h2>
                        <select className="border rounded px-2 py-1">
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>June</option>
                            <option>July</option>
                            <option>August</option>
                            <option>September</option>
                            <option>October</option>
                            <option>November</option>
                            <option>December</option>
                        </select>
                    </div>
                    <StatsCard stats={stats} />
                </div>
                <EducationalContent />
            </div>
        </div>
    );
}
