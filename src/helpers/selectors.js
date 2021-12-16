export function getAppointmentsForDay(state, day) {
  return state.days.reduce((acc, cv) => {
    if (cv.name === day) {
      cv.appointments.forEach((appointment) => {
        for (let app in state.appointments) {
          if (appointment.toString() === app) {
            acc.push(state.appointments[app]);
          }
        }
      });
    }
    return acc;
  }, []);
}

export function getInterviewersForDay(state, day) {
  return state.days.reduce((acc, cv) => {
    if (cv.name === day) {
      cv.interviewers.forEach((appointment) => {
        for (let app in state.interviewers) {
          if (appointment.toString() === app) {
            acc.push(state.interviewers[app]);
          }
        }
      });
    }
    return acc;
  }, []);
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
}
