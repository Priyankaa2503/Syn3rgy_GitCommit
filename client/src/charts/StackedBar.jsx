import React from "react";
import Chart from "react-apexcharts";

const StackedBar = () => {
const generateRandomData = (length) =>
  Array.from({ length }, () => Math.floor(Math.random() * 100));

const series = [
  {
    name: "EV Hub",
    data: generateRandomData(30),
  },
  {
    name: "Home",
    data: generateRandomData(30),
  },
  {
    name: "Work",
    data: generateRandomData(30),
  },
  {
    name: "Sell Back",
    data: generateRandomData(30),
  },
  {
    name: "Other",
    data: generateRandomData(30),
  },
];
  const options = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          enabled: false,
        },
      },
    },
    stroke: {
      width: 0,
      colors: ["#000000"],
    },
    // xaxis: {
    //   categories: ["EV Hub", "Home", "Work", "Sell Back", "Other"],
    //   labels: {
    //     show: false, // Hide x-axis labels
    //   },
    // },
    tooltip: {
      style: {
        colors: ["#000000"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      title: {
        text: undefined,
      },
      show: false,
    },

    grid: {
      show: false,
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      labels: {
        colors: "#ffffff",
      },
      
    },
  };

  return (
    <div id="bar-graph">
      <Chart options={options} series={series} type="bar" height={400} />
    </div>
  );
};

export default StackedBar;
