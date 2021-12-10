import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem({
  name,
  avatar,
  setInterviewer,
  selected,
}) {
  const selectedClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });
  return (
   
      <li onClick={setInterviewer} className={selectedClass}>
        <img className="interviewers__item-image" src={avatar} alt={name} />
        {selected && name}
      </li>
   
  );
}
