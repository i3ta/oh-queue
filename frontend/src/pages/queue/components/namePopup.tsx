import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { PopupBackground } from "@/components/popupBackground";
import { Text } from "@/components/text";
import { updateName } from "@/lib/api/queue";
import { useState, type FormEventHandler } from "react";

export interface NamePopupProps {
  open: boolean;
  setOpen: (v: boolean) => any;
  gtid: string | null;
  anonName: string | null;
  onSubmit: (status: "success" | "error", name: string) => any;
}

export const NamePopup = ({
  open,
  setOpen,
  gtid,
  anonName,
  onSubmit,
}: NamePopupProps) => {
  const [newName, setNewName] = useState<string | undefined>(undefined);

  const handleClose = () => {
    setOpen(false);
    setNewName(undefined);
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    handleClose();
    const updatedName = newName !== "" ? newName : anonName;
    if (gtid && updatedName) {
      const { type, name } = await updateName(gtid, updatedName);
      if (type === "success") {
        onSubmit("success", name);
      } else {
        onSubmit("error", name);
      }
    }
  };

  return (
    open && (
      <PopupBackground
        onClose={handleClose}
        className="flex flex-col gap-2 items-stretch"
      >
        <Text size="h2">What would you like to be called?</Text>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 items-center"
        >
          <Input
            type="text"
            placeholder={anonName ?? "Name"}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            autoFocus
            className="font-mono"
          />
          <Button type="submit" className="font-mono">
            Submit
          </Button>
        </form>
      </PopupBackground>
    )
  );
};
