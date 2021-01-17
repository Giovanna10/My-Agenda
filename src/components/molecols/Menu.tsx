import React, { ChangeEvent, useState } from "react";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import TabPanel from "../atoms/TabPanel";
import EventsContainer from "./EventsContainer";
import { Event } from "../../interfaces";

interface TabPanelProps {
  agendaEvents: Event[]
}

const Menu: React.FunctionComponent<TabPanelProps> = ({agendaEvents}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab
            label="Today"
            id="simple-tab-0"
            aria-controls="simple-tabpanel-0"
          />
          <Tab
            label="Week"
            id="simple-tab-1"
            aria-controls="simple-tabpanel-1"
          />
          <Tab
            label="Month"
            id="simple-tab-2"
            aria-controls="simple-tabpanel-2"
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <EventsContainer events={agendaEvents} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </>
  );
};

export default Menu;
