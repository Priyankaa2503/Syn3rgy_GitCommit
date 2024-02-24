import React from 'react'
import {
  Account,
  Dashboard,
  MyTrips,
  Stations,
  SubscriptionPlan
} from "./sections"

const MainModule = ({
  active,
  setActive
}) => {
  const getSection = () => {
    switch (active) {
      case "Dashboard":
        return <Dashboard />;
      case "Account":
        return <Account />;
      case "Stations":
        return <Stations />;
      case "My Trips":
        return <MyTrips />;
      case "Subscription Plan":
        return <SubscriptionPlan />;
      default:
        return <Dashboard />;
    }
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-5 gap-4">
      <div className="w-full h-24 flex justify-between items-center">
        <div className="text-3xl font-semibold">{active}</div>
      </div>
      {getSection()}
    </div>
  );
}

export default MainModule