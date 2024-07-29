"use client";

import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaCalendarAlt } from 'react-icons/fa';

const ScheduleCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handlePreviousWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
  };

  const handleNextWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    alert(`You selected ${date.toDateString()}`);
  };

  const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
  const daysArray = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(date.getDate() + i);
    return date;
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <div className="flex justify-between items-center mb-6">
        <button onClick={handlePreviousWeek} className="flex items-center px-2 py-1 text-sm text-gray-600 border rounded hover:bg-gray-100">
          <FaChevronLeft />
        </button>
        <h2 className="text-2xl font-bold text-green-900">Schedule</h2>
        <button onClick={handleNextWeek} className="flex items-center px-2 py-1 text-sm text-gray-600 border rounded hover:bg-gray-100">
          <FaChevronRight />
        </button>
      </div>
      <div className="flex justify-between items-center mb-6">
        <button className="flex items-center px-3 py-2 text-sm text-white bg-green-900 rounded hover:bg-green-500">
          Feb
          <FaCalendarAlt className="ml-2" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-4">
        {daysArray.map((date, index) => (
          <div
            key={index}
            onClick={() => handleDateClick(date)}
            className={`flex flex-col items-center p-2 rounded-lg cursor-pointer transition-colors duration-200 ease-in-out ${
              selectedDate.toDateString() === date.toDateString() ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-green-200'
            }`}
          >
            <span className="font-semibold text-sm">{weekDays[date.getDay()]}</span>
            <span className="text-lg font-bold">{date.getDate()}</span>
            <div className={`w-4 h-4 rounded-full mt-2 ${date.getDay() === selectedDate.getDay() ? 'bg-white' : 'bg-green-900'}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleCalendar;
