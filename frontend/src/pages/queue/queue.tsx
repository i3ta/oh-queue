import { Card } from "@/components/card";
import { Text } from "@/components/text";
import { Settings } from "lucide-react";

export const Queue = () => {
  return (
    <div className="w-screen h-screen bg-neutral-900 py-8 px-20 flex flex-col gap-8">
      <div className="flex flex-row justify-end">
        <Settings className="text-neutral-600 cursor-pointer" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 mb-20">
        <div className="col-span-1 lg:col-span-2 flex flex-col justify-center">
          <Text size="h2">Welcome to</Text>
          <Text size="t2">
            <span className="text-yellow-500">CS 2200</span> Office Hours
          </Text>
          <Text size="p">
            Join the queue by scanning your Buzzcard at the front of the room.
          </Text>
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <Card>
            <Text>
              There are currently{" "}
              <span className="text-yellow-500 font-bold">2 TAs</span> on duty.
            </Text>
          </Card>
          <Card>
            <Text>
              There are currently{" "}
              <span className="text-yellow-500 font-bold">10 students</span> in
              the queue.
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
    </div>
  );
};
