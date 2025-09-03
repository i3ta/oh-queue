import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { GtidPopup } from "@/components/gtidPopup";
import { toast } from "@/components/sonner";
import { Text } from "@/components/text";
import { useScanner } from "@/hooks/useScanner";
import {
  dequeueUser,
  enqueueUser,
  getQueue,
  getUserType,
} from "@/lib/api/queue";
import { addTA, getTAs, removeTA } from "@/lib/api/tas";
import { cn } from "@/lib/utils";
import type { User } from "@/types/user";
import { useEffect, useState } from "react";

export interface ActiveQueueProps {
  estimatedTime: number;
  enabled: boolean;
  endTime: string;
}

export const ActiveQueue = ({
  estimatedTime,
  enabled,
  endTime,
}: ActiveQueueProps) => {
  const [queue, setQueue] = useState<string[]>([]);
  const [queueLength, setQueueLength] = useState(0);
  const [tas, setTAs] = useState<User[]>([]);
  const [addTAOpen, setAddTAOpen] = useState(false);
  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [taDequeueOpen, setTADequeueOpen] = useState(false);
  const [taToRemove, setTAToRemove] = useState<string | null>(null);

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

  const enqueueStudent = async (gtid: string) => {
    const { type, name } = await enqueueUser(gtid);
    if (type === "exists") {
      toast(`You are already in the queue! Your name is Anonymous ${name}.`);
    } else if (type === "new") {
      toast(
        `You have been added to the queue! Your name is Anonymous ${name}.`,
      );
    }
  };

  const handleScannedCard = async (gtid: string) => {
    const type = await getUserType(gtid);
    if (type === "student") {
      await enqueueStudent(gtid);
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

  const handleAddTA = async (gtid: string) => {
    const type = await getUserType(gtid);
    if (type === "ta") {
      await addTA(gtid);
      toast("You have been clocked in!");
    } else {
      toast("You do not have permissions for this.");
    }
    await updateData();
    setAddTAOpen(false);
  };

  const handleRemoveTA = async (gtid: string) => {
    const type = await getUserType(gtid);
    console.log(gtid, type, taToRemove);
    if (type === "ta" && taToRemove) {
      await removeTA(taToRemove);
      toast("TA has been clocked out.");
    } else {
      toast("You do not have permissions for this.");
    }
    await updateData();
    setTAToRemove(null);
  };

  const handleAddStudent = async (gtid: string) => {
    const type = await getUserType(gtid);
    if (type === "student") {
      await enqueueStudent(gtid);
    } else {
      toast("You do not have permissions for this.");
    }
    await updateData();
    setAddStudentOpen(false);
  };

  const handleDequeue = async (gtid: string) => {
    const type = await getUserType(gtid);
    if (type === "ta") {
      const name = await dequeueUser();
      if (name) {
        toast(`The next student is Anonymous ${name}.`);
      } else {
        toast(`The queue is empty.`);
      }
    } else {
      toast("You do not have permission for this.");
    }
    await updateData();
    setTADequeueOpen(false);
  };

  const shouldUseScanner =
    enabled && !addTAOpen && !addStudentOpen && !taToRemove && !taDequeueOpen;
  useScanner(handleScannedCard, shouldUseScanner);

  useEffect(() => {
    // initialize data
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
          {endTime !== "" && (
            <Text size="p">
              Office hours ends at <span className="font-bold">{endTime}</span>.
            </Text>
          )}
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-1" />
        <Card className="h-fit flex flex-col gap-4">
          <Text size="h3" className="font-bold">
            TAs on duty
          </Text>
          {tas.map((ta, i) => (
            <Text
              key={i}
              size="p"
              className="cursor-pointer hover:line-through"
              onClick={() => setTAToRemove(ta.gtid)}
            >
              {ta.name}
            </Text>
          ))}
          <div className="w-full flex justify-center gap-2">
            <Button
              className={cn(
                "border bg-neutral-600/25 hover:bg-neutral-600/50 cursor-pointer transition-all",
                "text-white font-mono",
              )}
              onClick={() => setAddTAOpen(true)}
            >
              Clock In
            </Button>
            <Button
              className={cn(
                "border bg-neutral-600/25 hover:bg-neutral-600/50 cursor-pointer transition-all",
                "text-white font-mono",
              )}
              onClick={() => setTADequeueOpen(true)}
            >
              Dequeue
            </Button>
          </div>
        </Card>
        <Card className="h-fit flex flex-col gap-4">
          <Text size="h3" className="font-bold">
            Students in the queue
          </Text>
          {queue.map((user, i) => (
            <Text key={i} size="p">
              Anonymous {user}
            </Text>
          ))}
          <div className="w-full flex justify-center">
            <Button
              className={cn(
                "border bg-neutral-600/25 hover:bg-neutral-600/50 cursor-pointer transition-all",
                "text-white font-mono",
              )}
              onClick={() => setAddStudentOpen(true)}
            >
              Join Queue
            </Button>
          </div>
        </Card>
      </div>
      <GtidPopup
        open={addTAOpen}
        setOpen={setAddTAOpen}
        onSubmit={handleAddTA}
      />
      <GtidPopup
        open={addStudentOpen}
        setOpen={setAddStudentOpen}
        onSubmit={handleAddStudent}
      />
      <GtidPopup
        open={taDequeueOpen}
        setOpen={setTADequeueOpen}
        onSubmit={handleDequeue}
      />
      <GtidPopup
        open={taToRemove !== null}
        setOpen={(val) => !val && setTAToRemove(null)}
        onSubmit={handleRemoveTA}
      />
    </>
  );
};
