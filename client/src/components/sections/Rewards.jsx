import React from "react";

const RewardSystem = ({ carbonFootprintReduction }) => {
  // Dummy data (replace with actual data)
  const pointsPerEmissionReduction = 10;
  const initialRewardPoints = 50;

  // Calculate reward points based on carbon footprint reduction
  const rewardPoints =
    initialRewardPoints +
    Math.floor(carbonFootprintReduction * pointsPerEmissionReduction);

  return (
    <div>
      <h2>Reward System</h2>
      <p>Your current reward points: {rewardPoints}</p>
      <p>
        Unlock exclusive rewards and discounts by reducing your carbon
        footprint!
      </p>
    </div>
  );
};

export default RewardSystem;
