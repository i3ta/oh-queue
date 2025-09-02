import { useEffect, useRef } from "react";

export const useScanner = (
  onScan: (contents: string) => any,
  enabled: boolean = true,
  scanSep: number = 500,
) => {
  const lastInputTime = useRef(0);
  const gtidRegex = /;\d{4}=(\d{9})=[\w=]*$/;

  const enabledRef = useRef(enabled);
  const scanRef = useRef(onScan);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  useEffect(() => {
    scanRef.current = onScan;
  }, [onScan]);

  useEffect(() => {
    let buffer = "";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (enabledRef.current) {
        const now = Date.now();

        if (e.key.length === 1) {
          if (now - lastInputTime.current < scanSep) {
            buffer += e.key;
          } else {
            buffer = e.key;
          }
        } else if (e.key === "Enter") {
          const matches = buffer.match(gtidRegex);
          if (matches && matches.length >= 2) {
            scanRef.current(matches[1]);
          }
          buffer = "";
        }

        lastInputTime.current = now;
      } else {
        buffer = "";
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
};
