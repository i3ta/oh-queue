import { useEffect, useState } from "react";
import { SettingsPopup } from "./components/settingsPopup";
import {
  CloudAlert,
  CloudCheck,
  CloudUpload,
  SettingsIcon,
} from "lucide-react";
import type { SettingOption } from "@/types/settingOption";
import { healthcheck } from "@/lib/api/healthcheck";
import { ActiveQueue } from "./components/activeQueue";
import { InactiveQueue } from "./components/inactiveQueue";

export const Queue = () => {
  const [network, setNetwork] = useState<"pending" | "good" | "bad">("pending");
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
    healthcheck().then((connection) => {
      if (connection) setNetwork("good");
      else setNetwork("bad");
    });
  }, []);

  return (
    <div className="w-screen h-full min-h-screen bg-neutral-900 py-8 px-20 flex flex-col gap-8">
      <div className="flex flex-row justify-end items-center gap-4">
        {network === "pending" ? (
          <CloudUpload className="text-neutral-600" />
        ) : network === "good" ? (
          <CloudCheck className="text-neutral-600" />
        ) : (
          <CloudAlert className="text-neutral-600" />
        )}
        <SettingsIcon
          className="text-neutral-600 cursor-pointer"
          onClick={() => setSettingsOpen(true)}
        />
      </div>
      {ohOpen ? (
        <ActiveQueue
          estimatedTime={estimatedTime}
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
