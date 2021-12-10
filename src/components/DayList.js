import React from "react";
import DayListItem from "./DayListItem";

export default function DayList({days, value, onChange}) {
  return (
    <div>
      <ul>
        {days.map((dayData) => 
          <DayListItem
            key={dayData.id}
            spots={dayData.spots}
            name={dayData.name}
            setDay={onChange}
            selected={value === dayData.name}
          />
        )}
      </ul>
    </div>
  );
}

