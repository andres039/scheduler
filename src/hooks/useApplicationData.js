import { useState, useEffect } from "react";
import axios from "axios";
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  const setDay = (day) => setState({ ...state, day });

  const updateSpots = function (appointments) {
    const dayName = state.day;
    const objDay = (function () {
      for (let obj of state.days) {
        if (dayName === obj.name) {
          return obj;
        }
      }
    })();
    const dayIndex = objDay.id - 1;
    const nullAppointments = objDay.appointments.filter(
      (id) => !appointments[id].interview
    );
    const spots = nullAppointments.length;
    const updatedDay = { ...state.days[dayIndex], spots: spots };
    const updatedWeek = [...state.days];
    updatedWeek[dayIndex] = updatedDay;
    return updatedWeek;
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = updateSpots(appointments);

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({
        ...state,
        appointments,
        days,
      });
    });
  };
  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = updateSpots(appointments);
    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointments,
        days,
      });
    });
  };
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
