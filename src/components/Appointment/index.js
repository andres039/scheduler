import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment({
  time,
  id,
  interview,
  interviewers,
  bookInterview,
  cancelInterview,
}) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch((err) => err.message);
      console.log(interview)
  }
  function onDelete() {
    transition(CONFIRM);
  }
  function confirmDelete(id) {
    transition(SAVING);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch((err) => err.message);
  }
  function cancel() {
    transition(SHOW)
  }
  //build function delete in the same style as above, use id prop to delete -- Intermediate state to confirm the delete.
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={onDelete}
          id={id}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => back(EMPTY)}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === CONFIRM && <Confirm id={id} onConfirm={confirmDelete} onCancel={cancel}/>}
    </article>
  );
}
