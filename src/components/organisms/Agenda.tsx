import React, { useCallback, useEffect, useState } from "react";
import { Event } from "../../interfaces";
import { getEvents } from "../../services/method";
import {
  Inject,
  Day,
  Week,
  WorkWeek,
  Month,
  DragAndDrop,
  Resize,
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  PopupOpenEventArgs,
} from "@syncfusion/ej2-react-schedule";
import { createElement } from "@syncfusion/ej2-base";
import { DropDownList } from "@syncfusion/ej2-dropdowns";

interface AgendaProps {}

const Agenda: React.FunctionComponent<AgendaProps> = (props) => {
  const [agendaEvents, setAgendaEvents] = useState<Event[]>([]);
  const fields = {
    id: "id",
    subject: { name: "title", title: "Event Name" },
    location: { name: "location", title: "Event Location" },
    description: { name: "description", title: "Event Description" },
    eventType: "type",
    startTime: { name: "startTime", title: "Start Duration" },
    endTime: { name: "endTime", title: "End Duration" },
  };

  const onPopupOpen = (args: PopupOpenEventArgs | undefined) => {
    const data: any = args?.data;
    if (args?.type === "Editor") {
      if (!args?.element.querySelector(".custom-field-row")) {
        let row = createElement("div", { className: "custom-field-row" });
        let formElement = args?.element.querySelector(".e-schedule-form");
        if (formElement !== null) {
          formElement.firstChild!.insertBefore(
            row,
            formElement.firstChild!.firstChild
          );
        }
        let container = createElement("div", {
          className: "custom-field-container",
        });
        let inputEle = createElement("input", {
          className: "e-field",
          attrs: { name: "EventType" },
        });
        container.appendChild(inputEle);
        row.appendChild(container);
        let drowDownList = new DropDownList({
          dataSource: [
            { text: "Public Event", value: "public-event" },
            { text: "Maintenance", value: "maintenance" },
            { text: "Commercial Event", value: "commercial-event" },
            { text: "Family Event", value: "family-event" },
          ],
          fields: { text: "text", value: "value" },
          value: data.eventType,
          floatLabelType: "Always",
          placeholder: "Event Type",
        });
        drowDownList.appendTo(inputEle);
        inputEle.setAttribute("name", "EventType");
      }
    }
  };

  const events = useCallback(async () => {
    const eventsArray = await getEvents();
    eventsArray && setAgendaEvents(eventsArray);
  }, []);

  useEffect(() => {
    events();
  }, [events]);

  return (
    <ScheduleComponent
      height="100vh"
      eventSettings={{ dataSource: agendaEvents, fields }}
      popupOpen={onPopupOpen}
    >
      <ViewsDirective>
        <ViewDirective option="Week" startHour="07:00" endHour="23:00" />
        <ViewDirective option="WorkWeek" startHour="08:00" endHour="21:00" />
        <ViewDirective option="Month" showWeekend={false} />
      </ViewsDirective>
      <Inject services={[Day, Week, WorkWeek, Month, DragAndDrop, Resize]} />
    </ScheduleComponent>
  );
};

export default Agenda;
