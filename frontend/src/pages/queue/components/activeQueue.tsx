import { Card } from "@/components/card";
import { Text } from "@/components/text";
import { useScanner } from "@/hooks/useScanner";
import {
  dequeueUser,
  enqueueUser,
  getQueue,
  getUserType,
} from "@/lib/api/queue";
import { getTAs } from "@/lib/api/tas";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface ActiveQueueProps {
  estimatedTime: number;
}

export const ActiveQueue = ({ estimatedTime }: ActiveQueueProps) => {
  const [queue, setQueue] = useState<string[]>([]);
  const [queueLength, setQueueLength] = useState(0);
  const [tas, setTAs] = useState<string[]>([]);

  const expectedTime =
    tas.length > 0 ? (queueLength / tas.length) * estimatedTime : "infinity";

  const updateData = async () => {
    try {
      const { length, data } = await getQueue();
      setQueueLength(length);
      setQueue(data.map((u) => u.name));

      const tas = await getTAs();
      setTAs(tas);
    } catch (err: any) {
      console.error("There was an error updating queue data:", err);
    }
  };

  const handleScannedCard = async (gtid: string) => {
    const type = await getUserType(gtid);
    if (type === "student") {
      const { type, name } = await enqueueUser(gtid);
      if (type === "exists") {
        toast(`You are already in the queue! Your name is Anonymous ${name}.`);
      } else if (type === "new") {
        toast(
          `You have been added to the queue! Your name is Anonymous ${name}.`,
        );
      }
    } else if (type === "ta") {
      const name = await dequeueUser();
      if (name) {
        toast(`The next student is Anonymous ${name}.`);
      } else {
        toast(`The queue is empty.`);
      }
    }
    await updateData();
  };

  useScanner(handleScannedCard);

  useEffect(() => {
    updateData();
  }, []);

  return (
    <>
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
              <span className="text-yellow-500 font-bold">
                {tas.length} TAs
              </span>{" "}
              on duty.
            </Text>
          </Card>
          <Card>
            <Text>
              There {queueLength === 1 ? "is" : "are"} currently{" "}
              <span className="text-yellow-500 font-bold">
                {queueLength} {queueLength === 1 ? "student" : "students"}
              </span>{" "}
              in the queue.
            </Text>
          </Card>
          <Card>
            <Text>
              The current expected wait time is about{" "}
              <span className="text-yellow-500 font-bold">
                {expectedTime} minutes
              </span>
              .
            </Text>
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="h-fit flex flex-row">
          <Text size="h3" className="font-bold">
            TAs on duty
          </Text>
        </Card>
        <Card className="h-fit flex flex-col gap-4">
          <Text size="h3" className="font-bold">
            Students in the queue
          </Text>
          {queue.map((user) => (
            <Text size="p">Anonymous {user}</Text>
          ))}
        </Card>
      </div>
    </>
  );
};
