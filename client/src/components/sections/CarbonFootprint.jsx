import React from "react";
import Chart from "react-apexcharts";
import RewardSystem from "./Rewards";

const CarbonFootprintChart = ({

}) => {
     const evEmissions = 300;
     const iceVehicleEmissionsTotal = 500;
     const emissionsReduction = iceVehicleEmissionsTotal - evEmissions;
  const chartOptions = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: [
        "EV Emissions",
        "ICE Vehicle Emissions",
        "Emissions Reduction",
      ],
    },
  };

  const chartSeries = [
    {
      name: "Grams of CO2",
      data: [evEmissions, iceVehicleEmissionsTotal, emissionsReduction],
    },
  ];


  const suggestions = [
    "Drive less by walking, biking, carpooling, or taking public transit",
    "Upgrade to a high-efficiency vehicle or, better yet, an electric vehicle",
    "Reduce, reuse, and recycle",
    "Use energy-efficient appliances and light bulbs",
    "Plant trees",
  ];

  return (
    <div>
      <h2>Carbon Footprint Comparison</h2>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
      />

      <h2>Suggested Ways to Reduce Emissions</h2>
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>

      <RewardSystem carbonFootprintReduction={emissionsReduction} />
    </div>
  );
};

export default CarbonFootprintChart;
