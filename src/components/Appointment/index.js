import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
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
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE), true);
  }
  function onDelete() {
    transition(CONFIRM);
  }
  function confirmDelete(id) {
    transition(SAVING, true);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE), true);
  }

  function onEdit() {
    transition(EDIT);
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
          onEdit={onEdit}
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
      {mode === CONFIRM && (
        <Confirm id={id} onConfirm={confirmDelete} onCancel={back} />
      )}
      {mode === EDIT && (
        <Form
          student={interview.student}
          interviewers={interviewers}
          interviewer={interview.interviewer.id}
          onCancel={() => back(EMPTY)}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error onClose={back} message="Could not save appointment" />
      )}
      {mode === ERROR_DELETE && (
        <Error onClose={back} message="Could not cancel appointment" />
      )}
    </article>
  );
}

