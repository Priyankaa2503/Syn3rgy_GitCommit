import React from "react";
import Chart from "react-apexcharts";

const StackedBar = () => {
  const series = [
    {
      name: "Marine Sprite",
      data: [44, 55, 41, 37, 22, 43, 21],
    },
    {
      name: "Striking Calf",
      data: [53, 32, 33, 52, 13, 43, 32],
    },
    {
      name: "Tank Picture",
      data: [12, 17, 11, 9, 15, 11, 20],
    },
    {
      name: "Bucket Slope",
      data: [9, 7, 5, 8, 6, 9, 4],
    },
    {
      name: "Reborn Kid",
      data: [25, 12, 19, 32, 25, 24, 10],
    },
  ];
  const options = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: false
      }
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
      colors: ["#fff"],
    },
    xaxis: {
      categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
      labels: {
        show: false, // Hide x-axis labels
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
