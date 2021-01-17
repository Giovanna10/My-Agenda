import { AxiosResponse } from "axios";
import { addDays, format } from "date-fns";
import { EventResponse, Event } from "../../interfaces";
import { agendaService } from "../axios";

const getEvents = async () => {
  try {
    const { data }: AxiosResponse<EventResponse[]> = await agendaService.get(`/posts`);
    const events: Event[] = data.map((item: EventResponse, index: number) => {
      const date = addDays(new Date(), index);      

      return {
        id: item.id,
        title: item.title,
        description: item.body, 
        eventType: "Casa",
        location: "Milan",
        startTime: date,
        endTime: date,
        IsAllDay: false
      };
    });    

    return events;
  } catch (error) {
    return undefined;
  }
};

export default getEvents;
