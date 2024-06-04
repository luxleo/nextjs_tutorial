import {create} from "zustand";

export type windLoadFormState = {
    isModalOn: boolean;
}

export type windLoadFormAction = {
    toggleModalOn: ()=> void
}

export const initialWindLoadState : windLoadFormState = {
    isModalOn: false,
}

export const useWindLoadFormStore = create<windLoadFormState & windLoadFormAction>((set, get) => ({
    ...initialWindLoadState,
    toggleModalOn: ()=> set((state)=> ({isModalOn: !state.isModalOn}))
}));