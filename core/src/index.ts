import { DirDescriptor } from "./DirDescriptor";
// import path from "path";
// import fs from "fs/promises";
// import fsbase from "fs";

export let RS_HOST: string = '<unset>';

async function ensureHost() {
  if (RS_HOST === '<unset>') {
    const resp = await fetch('/restspace.json');
    const config = await resp.json();
    RS_HOST = config.base;
  }
}

let chordMap: Record<string, Record<string, string>> | null = null;

export async function getBaseUrl(chordId: string, serviceName: string) {
  await ensureHost();
  if (chordMap === null) {
    const res = await fetch(`${RS_HOST}/.well-known/restspace/chord-map`);
    chordMap = await res.json();
  }
  const path = chordMap?.[chordId]?.[serviceName];
  if (path === null) return null;
  return `${RS_HOST}${path}`;
}

export function isBodyInit(data: any): data is BodyInit {
  if (data instanceof ArrayBuffer
      || data instanceof ReadableStream
      || data instanceof Blob
      || data instanceof FormData
      || data instanceof URLSearchParams
      || data instanceof ArrayBuffer
      || typeof data === 'string') return true;
  // check for ArrayBufferView
  return data && data.buffer instanceof ArrayBuffer && data.byteLength !== undefined;
}

export type ListMode = "details" | "items" | "simple";

type ListResult<T extends ListMode> = T extends "details" ? DirDescriptor : (T extends "items" ? Record<string, unknown> : string[]);

export type GetListFunction = {
  (chordId: string, serviceName: string, path: string): Promise<string[]>;
  (chordId: string, serviceName: string, path: string, mode: "details"): Promise<DirDescriptor>;
  (chordId: string, serviceName: string, path: string, mode: "items"): Promise<Record<string, unknown>>;
}

export const rsService = {
  get: async (chordId: string, serviceName: string, path: string) => {
    const baseUrl = await getBaseUrl(chordId, serviceName);
    return await fetch(`${baseUrl}${path}`);
  },
  getList: async <TMode extends ListMode>(chordId: string, serviceName: string, path: string, mode: TMode): Promise<ListResult<TMode>> => {
    const baseUrl = await getBaseUrl(chordId, serviceName);
    let url = `${baseUrl}${path}`;
    if (!url.endsWith('/')) url += '/';

    switch (mode) {
      case "details":
        url += "?$list=details";
        break;
      case "items":
        url += "?$list=items";
        break;
    }

    const resp = await fetch(url);
    const val = await resp.json();
    return val;
  },
  put: async (chordId: string, serviceName: string, path: string, body: BodyInit) => {
    const baseUrl = await getBaseUrl(chordId, serviceName);
    return await fetch(`${baseUrl}${path}`, {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      body
    });
  },
  post: async (chordId: string, serviceName: string, path: string, body: BodyInit) => {
    const baseUrl = await getBaseUrl(chordId, serviceName);
    return await fetch(`${baseUrl}${path}`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body
    });
  }
}