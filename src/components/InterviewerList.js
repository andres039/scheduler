import React from "react";
import "components/InterviewerList.scss";
import PropTypes from 'prop-types';
import InterviewerListItem from "./InterviewerListItem";
export default function InterviewerList({ interviewers, value, onChange }) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map((interviewerData) => (
          <InterviewerListItem
            key={interviewerData.id}
            name={interviewerData.name}
            setInterviewer={() => onChange(interviewerData.id)}
            avatar={interviewerData.avatar}
            selected={value === interviewerData.id ? true : false}
          />
        ))}
      </ul>
    </section>
  );
}
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};