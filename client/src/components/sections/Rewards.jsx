import React from "react";
import { FaTrophy } from "react-icons/fa";

const RewardSystem = ({ carbonFootprintReduction }) => {
  // Dummy data (replace with actual data)
  const pointsPerEmissionReduction = 10;
  const initialRewardPoints = 50;

  // Calculate reward points based on carbon footprint reduction
  const rewardPoints =
    initialRewardPoints +
    Math.floor(carbonFootprintReduction * pointsPerEmissionReduction);

  return (
    <div className=" p-4 rounded-md shadow-md flex items-center justify-center mb-8">
      <FaTrophy className="text-yellow-500 text-4xl mr-2" />
      <p className="mb-2">{rewardPoints}</p>
    </div>
  );
};

export default RewardSystem;
