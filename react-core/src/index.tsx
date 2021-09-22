import React from "react";
import { rsService, isBodyInit, ListMode } from '@restspace/core';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export function useServiceQuery(chordId: string, serviceName: string, path: string) {
  return useQuery(`${chordId}|${serviceName}|${path}`, async () => {
    const resp = await rsService.get(chordId, serviceName, path);
    if (!resp.ok) throw new Error(`Response error ${resp.status} ${resp.statusText}`);
    return await resp.text();
  });
}

export function useServiceList<TMode extends ListMode>(chordId: string, serviceName: string, path: string, mode: TMode) {
  return useQuery(`${chordId}|${serviceName}|${path}|${mode}`, async () => {
    const val = await rsService.getList<TMode>(chordId, serviceName, path, mode);
    return val;
  });
}

export function useServiceMutation(chordId: string, serviceName: string, path: string) {
  const client = useQueryClient();
  return useMutation(async (data: any) => {
    const sendData = isBodyInit(data) ? data : JSON.stringify(data);
    const resp = await rsService.put(chordId, serviceName, path, sendData);
    if (!resp.ok) throw new Error(`Response error ${resp.status} ${resp.statusText}`);
  }, {
    onSuccess: () => client.invalidateQueries(`${chordId}|${serviceName}|${path}`)
  });
}

