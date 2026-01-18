import { useEffect, useState } from "react";
import { SettingsPopup } from "./components/settingsPopup";
import {
  Book,
  BookAlert,
  CloudAlert,
  CloudCheck,
  CloudUpload,
  SettingsIcon,
} from "lucide-react";
import type { SettingOption } from "@/types/settingOption";
import { healthcheck, sheetsHealthcheck } from "@/lib/api/healthcheck";
import { ActiveQueue } from "./components/activeQueue";
import { InactiveQueue } from "./components/inactiveQueue";

export const Queue = () => {
  const [network, setNetwork] = useState<"pending" | "good" | "bad">("pending");
  const [sheets, setSheets] = useState<"pending" | "good" | "bad">("pending");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [ohOpen, setOhOpen] = useState(true);
  const [estimatedTime, setEstimatedTime] = useState(10);
  const [ohEndTime, setOhEndTime] = useState<string>("");

  const settings: SettingOption[] = [
    {
      type: "boolean",
      label: "Office Hours Open",
      id: "ohOpen",
      value: ohOpen,
      setValue: setOhOpen,
    },
    {
      type: "number",
      label: "Estimated Time (minutes) Per Student",
      id: "estimatedTime",
      value: estimatedTime,
      setValue: setEstimatedTime,
    },
    {
      type: "string",
      label: "End Time",
      id: "endTime",
      value: ohEndTime,
      setValue: setOhEndTime,
    },
  ];

  useEffect(() => {
    const checkStatus = () => {
      healthcheck().then((connection) => {
        if (connection) setNetwork("good");
        else setNetwork("bad");
      });

      sheetsHealthcheck().then((connection) => {
        if (connection) setSheets("good");
        else setSheets("bad");
      });
    };

    checkStatus();
    const intervalId = setInterval(checkStatus, 1000); // check status every 1 second

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-neutral-900 py-8 px-20 flex flex-col gap-8">
      <div className="flex flex-row justify-end items-center gap-4">
        {network === "pending" ? (
          <CloudUpload className="text-neutral-600" />
        ) : network === "good" ? (
          <CloudCheck className="text-neutral-600" />
        ) : (
          <CloudAlert className="text-neutral-600" />
        )}
        {sheets === "bad" ? (
          <BookAlert className="text-neutral-600" />
        ) : (
          <Book className="text-neutral-600" />
        )}
        <SettingsIcon
          className="text-neutral-600 cursor-pointer"
          onClick={() => setSettingsOpen(true)}
        />
      </div>
      {ohOpen ? (
        <ActiveQueue
          network={network}
          enabled={!settingsOpen}
          endTime={ohEndTime}
        />
      ) : (
        <InactiveQueue />
      )}
      <SettingsPopup
        open={settingsOpen}
        setOpen={setSettingsOpen}
        options={settings}
      />
    </div>
  );
};
