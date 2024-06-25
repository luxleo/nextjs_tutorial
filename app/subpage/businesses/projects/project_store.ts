import {create} from "zustand";
import {immer} from "zustand/middleware/immer";

interface ProjectSearchCond {
    year: number;
    query: string;
}

type Action = {
    updateYear: (year: number) => void
    updateQuery: (q: string) => void
}

export const useProjectStore = create<ProjectSearchCond & Action>()(
    immer((set) => ({
        year: 2017,
        query: '',
        updateQuery: (q: string) =>
            set((state) => {
                state.query = q;
            }),
        updateYear: (year: number) =>
            set((state) => {
                state.year = year;
            })
    }))
);