import { Card } from "@/components/card";
import { Text } from "@/components/text";
import { useState } from "react";
import { SettingsPopup } from "./components/settingsPopup";
import { SettingsIcon } from "lucide-react";
import type { SettingOption } from "@/types/settingOption";
import { useScanner } from "@/hooks/useScanner";

export const Queue = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [ohOpen, setOhOpen] = useState(true);
  const [estimatedTime, setEstimatedTime] = useState(5);

  const handleScannedCard = async (gtid: string) => {};

  useScanner(handleScannedCard);

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
  ];

  return (
    <div className="w-screen h-screen bg-neutral-900 py-8 px-20 flex flex-col gap-8">
      <div className="flex flex-row justify-end">
        <SettingsIcon
          className="text-neutral-600 cursor-pointer"
          onClick={() => setSettingsOpen(true)}
        />
      </div>
      {ohOpen ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 mb-20">
            <div className="col-span-1 lg:col-span-2 flex flex-col justify-center">
              <Text size="h2">Welcome to</Text>
              <Text size="t2">
                <span className="text-yellow-500">CS 2200</span> Office Hours
              </Text>
              <Text size="p">
                Join the queue by scanning your Buzzcard at the front of the
                room.
              </Text>
            </div>
            <div className="col-span-1 flex flex-col gap-4">
              <Card>
                <Text>
                  There are currently{" "}
                  <span className="text-yellow-500 font-bold">2 TAs</span> on
                  duty.
                </Text>
              </Card>
              <Card>
                <Text>
                  There are currently{" "}
                  <span className="text-yellow-500 font-bold">10 students</span>{" "}
                  in the queue.
                </Text>
              </Card>
              <Card>
                <Text>
                  The current expected wait time is about{" "}
                  <span className="text-yellow-500 font-bold">25 minutes</span>.
                </Text>
              </Card>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="flex flex-row">
              <Text size="h3" className="font-bold">
                TAs on duty
              </Text>
            </Card>
            <Card>
              <Text size="h3" className="font-bold">
                Students in the queue
              </Text>
            </Card>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex flex-col gap-8 justify-center items-center">
          <img src="/caution.png" className="h-2/3 max-h-80" />
          <Text size="t1">Sorry!</Text>
          <Text size="h2" className="text-center">
            CS 2200 Office Hours is{" "}
            <span className="text-yellow-500">Closed</span>. Check the Google
            Calendar for when Office Hours are open!
          </Text>
        </div>
      )}
      <SettingsPopup
        open={settingsOpen}
        setOpen={setSettingsOpen}
        options={settings}
      />
    </div>
  );
};
