import {useState, useEffect, useMemo, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

type MachineData = {
  machines: Record<string, Record<string, string>>;
  scores: { factory: string, machineScores: Record<string, string>};
};

type Store = {
  machineData?: MachineData,
  setMachineData: (machineData: MachineData) => void;
  resetMachineData: () => void;
  setScores: (scores: MachineData['scores']) => void;
}

export const useStore = create(
  persist<Store>(
    (set, get) => ({
      machineData: undefined,
      setMachineData: (machineData) => set({ machineData }),
      resetMachineData: () => set({ machineData: undefined }),
      setScores: (scores) => {
        const prevMachineData = get().machineData;
        if (prevMachineData) { 
          set({ machineData: { ...prevMachineData, scores } })
        }
      },
    }),
    {
      name: 'machine-data', 
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useMachineData = () => {
  const machineData = useStore((state) => state.machineData);
  const setMachineData = useStore((state) => state.setMachineData);
  const updateMachineData = setMachineData;
  const resetMachineData = useStore((state) => state.resetMachineData);
  const setScores = useStore((state) => state.setScores);

  return {
    machineData,
    updateMachineData,
    resetMachineData,
    setScores,
  };
};
