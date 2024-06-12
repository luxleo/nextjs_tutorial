import {create} from "zustand";

export type windLoadFormState = {
    windLoadValue: number;
    isModalOn: boolean;
}

export type windLoadFormAction = {
    toggleModalOn: ()=> void
    updateWindLoadValue: (value: number) => void
}

export const initialWindLoadState : windLoadFormState = {
    isModalOn: false,
    windLoadValue: 0,
}

export const useWindLoadFormStore = create<windLoadFormState & windLoadFormAction>((set, get) => ({
    ...initialWindLoadState,
    toggleModalOn: () => set((state) => ({isModalOn: !state.isModalOn})),
    updateWindLoadValue: (value: number) => set((state)=>({windLoadValue: value}))
}));