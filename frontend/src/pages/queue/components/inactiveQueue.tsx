import { Text } from "@/components/text";

export const InactiveQueue = () => {
  return (
    <div className="w-full h-full flex flex-col gap-8 justify-center items-center">
      <img src="/caution.png" className="h-2/3 max-h-80" />
      <Text size="t1">Sorry!</Text>
      <Text size="h2" className="text-center">
        CS 2200 Office Hours is <span className="text-yellow-500">Closed</span>.
        Check the Google Calendar for when Office Hours are open!
      </Text>
    </div>
  );
};
