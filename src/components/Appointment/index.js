import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment({
  time,
  interview
}) {
  return (
    <article className="appointment">
      <Header time={time} />
      {interview ? (
        <Show student={interview.student} interview={interview} />
      ) : (
        <Empty />
      )}
    </article>
  );
}
