import { config } from "@/config/config";
import { google } from "googleapis";

export const getService = () => {
  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({
    version: "v4",
    auth: auth,
  });
};

export const insertLogs = async (data: any[][]) => {
  try {
    const service = getService();

    const res = await service.spreadsheets.values.append({
      spreadsheetId: config.spreadsheetId,
      range: "logs!A2:E",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: data,
      },
    });

    return res.data.updates?.updatedRange;
  } catch (err: any) {
    console.error(`There was an error uploading logs:`, err);
    throw err;
  }
};

export const sheetsHealthcheck = async (): Promise<boolean> => {
  try {
    const service = getService();

    await service.spreadsheets.get({
      spreadsheetId: config.spreadsheetId,
      fields: "spreadsheetId",
    });

    return true;
  } catch (err) {
    console.error("Healthcheck failed:", err);
    return false;
  }
};
