import React, { useState } from "react";
import styles from "../../styles/AdminPanelCss/TrackingUser.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const userActivity = [
  { date: "2025-08-01", count: 5 },
  { date: "2025-08-02", count: 8 },
  { date: "2025-08-03", count: 3 },
  { date: "2025-08-04", count: 10 },
  { date: "2025-08-05", count: 7 },
  { date: "2025-08-06", count: 12 },
  { date: "2025-08-07", count: 9 },
  { date: "2025-08-08", count: 15 },
];

const TrackingUser = () => {
  const [view, setView] = useState("daily"); // daily | weekly | monthly

  // Transform data based on selected view
  const getFilteredData = () => {
    if (view === "daily") {
      return userActivity;
    }
    if (view === "weekly") {
      return [
        { date: "Week 1", count: 33 },
        { date: "Week 2", count: 28 },
        { date: "Week 3", count: 40 },
      ];
    }
    if (view === "monthly") {
      return [
        { date: "August", count: 180 },
        { date: "September", count: 220 },
      ];
    }
  };

  return (
    <div className={styles.trackingUserContainer}>
      <div>
      </div>
      {/* Buttons */}
      <div className={styles.scrolDateButtons}>
        <button onClick={() => setView("daily")} >
          Daily
        </button>
        <button onClick={() => setView("weekly")} >
          Weekly
        </button>
        <button onClick={() => setView("monthly")}>Monthly</button>
      </div>

      {/* Scrollable chart container */}
      <div className={styles.scrollableChartContainer}>
        <LineChart
          className={styles.lineChart}
          width={900} // default width for big screens
          height={300}
          data={getFilteredData()}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </div>

    </div>
  );
};

export default TrackingUser;
