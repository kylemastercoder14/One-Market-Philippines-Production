"use client";

import React from "react";
import {
  formatDate,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

const FullCalendarComponent = () => {
  const [currentEvents, setCurrentEvents] = React.useState<EventApi[]>([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [newEventTitle, setNewEventTitle] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState<DateSelectArg | null>(
    null
  );

  const handleDateClick = (selected: DateSelectArg) => {
    setSelectedDate(selected);
    setIsDialogOpen(true);
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEventTitle && selectedDate) {
      const calendarApi = selectedDate.view.calendar;
      calendarApi.unselect();

      const newEvent = {
        id: `${selectedDate?.start.toISOString()}-${newEventTitle}`,
        title: newEventTitle,
        start: selectedDate?.start,
        end: selectedDate?.end,
        allDay: selectedDate?.allDay,
      };

      calendarApi.addEvent(newEvent);
      handleCloseDialog();
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewEventTitle("");
  };
  return (
    <div className="mt-5">
      <div className="w-full">
        <FullCalendar
          height={"85vh"}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          select={handleDateClick}
          eventClick={(clickInfo: EventClickArg) => {
            clickInfo.event.remove();
            console.log(clickInfo.event);
          }}
          events={[
            {
              id: "1",
              title: "Haircut-8594 (Booked)",
              start: new Date().toISOString().split("T")[0], // Today's date
              allDay: false,
            },
            {
              id: "2",
              title: "Haircut-9864 (Booked)",
              start: new Date(new Date().setDate(new Date().getDate() + 3)) // 3 days from today
                .toISOString()
                .split("T")[0],
              allDay: false,
            },
            {
              id: "3",
              title: "Haircut-1234 (Booked)",
              start: new Date(new Date().setDate(new Date().getDate() + 7)) // 7 days from today
                .toISOString()
                .split("T")[0],
              allDay: false,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default FullCalendarComponent;
