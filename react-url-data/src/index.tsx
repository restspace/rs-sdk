import React from "react";
import { useServiceQuery, useServiceMutation, useServiceList } from "@restspace/react-core";
import chords from "@restspace/url-data/services.json";
import { QueryObserverResult } from "react-query";
import { ListMode } from "@restspace/core";

export function useDataServiceQuery<T>(dataset: string, item: string) {
  const result = useServiceQuery(chords.id, chords.newServices[0].name, `${dataset}/${item}`);
  return { ...result, data: result.data ? JSON.parse(result.data) as T : undefined } as QueryObserverResult<T, unknown>;
}

export function useDataServiceList<TMode extends ListMode>(dataset: string, mode: TMode) {
  return useServiceList(chords.id, chords.newServices[0].name, dataset, mode);
}

export function useDataServiceMutation(dataset: string, item: string) {
  return useServiceMutation(chords.id, chords.newServices[0].name, `${dataset}/${item}`);
}