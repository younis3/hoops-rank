"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { SyntheticEvent, useState } from "react";
import ScoreTable from "../components/scoreTable";

const inter = Inter({ subsets: ["latin"] });

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <main className="min-h-screen flex items-center justify-between p-12 flex-col ">
      <div className="tabsContainer text-center">
        <Box sx={{ width: "100%", maxWidth: { xs: 320, sm: 480 } }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
          >
            <Tab sx={{ fontSize: "11px" }} label="Player Rank" {...a11yProps(0)} />
            <Tab sx={{ fontSize: "11px" }} label="Premier League" {...a11yProps(1)} />
            <Tab sx={{ fontSize: "11px" }} label="Zachi Cup" {...a11yProps(2)} />
            <Tab sx={{ fontSize: "11px" }} label="Events" {...a11yProps(3)} />
            <Tab sx={{ fontSize: "11px" }} label="Gallery" {...a11yProps(4)} />
            <Tab sx={{ fontSize: "11px" }} label="Videos" {...a11yProps(5)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div className="mt-10">
            <ScoreTable />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="mt-10">Coming Soon</div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div className="mt-10">Coming Soon</div>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <div className="mt-10">Coming Soon</div>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <div className="mt-10">Coming Soon</div>
        </TabPanel>
        <TabPanel value={value} index={5}>
          <div className="mt-10">Coming Soon</div>
        </TabPanel>
      </div>
    </main>
  );
}
