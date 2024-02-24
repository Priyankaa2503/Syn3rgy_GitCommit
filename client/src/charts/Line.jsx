import React from "react";
import Chart from "react-apexcharts";

const Line = () => {
  const series = [
    {
      name: "Time",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 48],
    },
  ];
  const options = {
    chart: {
      height: 100,
      type: "line",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    fill: {
      type: "gradient",
    },
    xaxis: {
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 3,
      curve: "smooth",
    },
    colors: ["#44DDA0"],
    grid: {
      show: false,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false, //or just here to disable only y axis
        },
      },
    },
    // grid: {
    //   row: {
    //     colors: ["#f3f3f3"],
    //     opacity: 0.5,
    //   },
    // },
    // xaxis: {
    //   categories: [
    //     "Jan",
    //     "Feb",
    //     "Mar",
    //     "Apr",
    //     "May",
    //     "Jun",
    //     "Jul",
    //     "Aug",
    //     "Sep",
    //   ],
    // },
  };

  return (
    <div id="average-time">
      <Chart options={options} series={series} type="line" height={200} />
    </div>
  );
};

export default Line;
