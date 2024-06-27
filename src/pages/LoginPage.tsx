import React, { useState } from 'react';
import { useMission } from '../context/MissionContext'; // Import the useMission hook
import { useUnit} from '../context/UnitContext';

const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  const { missionName, setMissionName, missionType, setMissionType } = useMission();
  const [password, setPassword] = useState('');
  const { unit, setUnit } = useUnit();

  const handleLoginClick = () => {
    
    // Validation logic (unchanged)
    if (password && missionName && missionType) {
      onLogin();
    } else {
      console.log('Please fill in all fields');
    }
  };

  const handleMissionNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMissionName(e.target.value);
  };

  const handleMissionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMissionType(e.target.value);
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUnit(e.target.value);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200 text-white">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="max-w-md mx-auto text-white">
          <div className="flex items-center space-x-5 justify-center">
            <div className='text-black font-bold text-xl'>BATTLE BOARD</div>
          </div>
          <div className="mt-5">
            <label
              htmlFor="missionName"
              className="font-semibold text-sm text-gray-400 pb-1 block"
            >
              Mission Name
            </label>
            <input
              id="missionName"
              type="text"
              value={missionName}
              onChange={handleMissionNameChange}
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-white text-black focus:border-gray-600 focus:ring-4 focus:ring-gray-600"
            />
            <label
              htmlFor="missionType"
              className="font-semibold text-sm text-gray-400 pb-1 block"
            >
              Type of Mission
            </label>
            <select
              id="missionType"
              value={missionType}
              onChange={handleMissionTypeChange}
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-white text-black focus:border-gray-600 focus:ring-4 focus:ring-gray-600"
            >
              <option value="">Select Mission Type</option>
              <option value="Exercise">EXERCISE</option>
              <option value="Operation">OPERATION</option>
            </select>

            <label
              htmlFor="unit"
              className="font-semibold text-sm text-gray-400 pb-1 block"
            >
              Unit
            </label>
            <input
              id="unit"
              type="text"
              value={unit}
              onChange={handleUnitChange}
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-white text-black focus:border-gray-600 focus:ring-4 focus:ring-gray-600"
            />

            <label
              htmlFor="password"
              className="font-semibold text-sm text-gray-400 pb-1 block"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-white text-black focus:border-gray-600 focus:ring-4 focus:ring-gray-600"
            />
          </div>
          <div className="text-right mb-4">
            <a
              href="#"
              className="text-xs font-display font-semibold text-gray-500 hover:text-gray-400 cursor-pointer"
            >
              Forgot Password?
            </a>
          </div>
          <div className="flex justify-center items-center">
            <div></div>
          </div>
          <button
            type="submit"
            onClick={handleLoginClick}
            className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          >
            Log in
          </button>
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
            <a
              href="#"
              className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              or sign up
            </a>
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
