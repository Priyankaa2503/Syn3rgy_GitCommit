import React from "react";
import Chart from "react-apexcharts";
import RewardSystem from "./Rewards";

const CarbonFootprintChart = ({}) => {
  const evEmissions = 300;
  const iceVehicleEmissionsTotal = 500;
  const emissionsReduction = iceVehicleEmissionsTotal - evEmissions;
  const chartOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: [
        "EV Emissions",
        "ICE Vehicle Emissions",
        "Emissions Reduction",
      ],
      show: false,
    },
    colors: "#44bda0",
    grid: {
      show: false,
      xaxis: {
        lines: {
          show: false,
        },
      },
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
    <div className="max-w-3xl mx-auto px-4">
      {/* <div className="justify-end">
        <RewardSystem carbonFootprintReduction={emissionsReduction} />
      </div> */}

      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
        className="mb-8"
      />

      <h2 className="text-2xl font-bold mb-4">
        Suggested Ways to Reduce Emissions
      </h2>
      <ul className="list-disc pl-4 mb-8">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="mb-2">
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarbonFootprintChart;
