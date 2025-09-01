export type SettingOption =
  | {
      id: string;
      label: string;
      type: "boolean";
      value: boolean;
      setValue: (val: boolean) => void;
    }
  | {
      id: string;
      label: string;
      type: "string";
      value: string;
      setValue: (val: string) => void;
    }
  | {
      id: string;
      label: string;
      type: "number";
      value: number;
      setValue: (val: number) => void;
    };
