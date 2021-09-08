import { rsService } from "@restspace/core";

export const rsUrlData = {
  get: async (path: string) => {
    const resp = await rsService.get("url-data", "rs-url-data", path);
    return await resp.json();
  }
}