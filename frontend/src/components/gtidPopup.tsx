import { useEffect, useState, type MouseEvent } from "react";
import { PopupBackground } from "./popupBackground";
import { Text } from "./text";
import { useScanner } from "@/hooks/useScanner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./input-otp";

export interface GtidPopupProps {
  open: boolean;
  setOpen: (val: boolean) => any;
  onSubmit: (gtid: string) => any;
}

export const GtidPopup = ({ open, setOpen, onSubmit }: GtidPopupProps) => {
  const [typedInput, setTypedInput] = useState("");

  const handleClose = (e?: MouseEvent<any>) => {
    e?.stopPropagation();
    setOpen(false);
  };

  useScanner(onSubmit, open);

  useEffect(() => {
    if (typedInput.length === 9) {
      onSubmit(typedInput);
    }
  }, [typedInput]);

  useEffect(() => {
    setTypedInput("");
  }, [open]);

  return (
    open && (
      <PopupBackground onClose={handleClose}>
        <Text size="h2">Scan your Buzzcard or type in your GTID</Text>
        <div className="flex justify-center">
          <InputOTP
            maxLength={9}
            value={typedInput}
            onChange={(value) => setTypedInput(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot hidden index={0} />
              <InputOTPSlot hidden index={1} />
              <InputOTPSlot hidden index={2} />
              <InputOTPSlot hidden index={3} />
              <InputOTPSlot hidden index={4} />
              <InputOTPSlot hidden index={5} />
              <InputOTPSlot hidden index={6} />
              <InputOTPSlot hidden index={7} />
              <InputOTPSlot hidden index={8} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </PopupBackground>
    )
  );
};
