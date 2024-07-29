import React, { useState, useEffect } from 'react';

// Mock function to get weather data (needs to be replaced with actual API call)
const getWeather = async (): Promise<string> => {
  return "Sunny, 25°C";
};

// Mock function to get a motivational quote (should be replaced with actual API call)
const getMotivationalQuote = async (): Promise<string> => {
  return "The best way to find yourself is to lose yourself in the service of others.";
};

interface GreetingCardProps {
  name: string;
  theme: 'light' | 'dark';
}

const GreetingCard: React.FC<GreetingCardProps> = ({ name, theme }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [weather, setWeather] = useState<string>('');
  const [quote, setQuote] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 60000); // Update every minute

    // Fetch weather and quote data
    const fetchData = async () => {
      const weatherData = await getWeather();
      setWeather(weatherData);

      const quoteData = await getMotivationalQuote();
      setQuote(quoteData);
    };

    fetchData();

    // Cleanup timer on component unmount
    return () => clearInterval(timer);
  }, []);

  const formattedDate = date.toLocaleDateString();

  // theme classes 
  const themeClasses = theme === 'dark' 
    ? 'bg-[#0b2047] text-white' 
    : 'bg-gradient-to-r from-blue to-[#0b2047] text-white';

  return (
    <div className={`${themeClasses} p-8 rounded-lg shadow-lg w-full flex flex-col items-start`}>
      <h1 className="text-4xl font-extrabold mb-4">Hello, {name}!</h1>
      <p className="text-lg mb-2">Welcome to your dashboard. Have a great day!</p>
      <p className="text-md mb-2">Today&apos;s Date: {formattedDate}</p>
      <p className="text-md mb-2">Current Weather: {weather}</p>
      <blockquote className="text-md italic mt-4 border-l-4 border-white pl-4">{quote}</blockquote>
    </div>
  );
};

export default GreetingCard;
