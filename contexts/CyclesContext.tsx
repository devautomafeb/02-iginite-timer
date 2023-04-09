import React from 'react'
import { createContext, useEffect, useState } from 'react';

interface CreateCycleData {
    task: string;
    minutesAmount: number;
}

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

interface CyclesContextType {
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
    createNewCycle: (data: CreateCycleData) => void;
    interruptCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContentProvider({ children }) {

    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId)

    function markCurrentCycleAsFinished() {
        setCycles(state =>
            state.map((cycle) => {
                if (cycle.id == activeCycleId) {
                    return { ...cycle, finishedDate: new Date() }
                }
                else { return cycle }
            })
        )
    }

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function createNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }
        setCycles((state) => [...state, newCycle])
        setActiveCycleId(newCycle.id)
        setAmountSecondsPassed(0)
    }

    function interruptCycle() {
        setActiveCycleId(null)
        setCycles((state) => state.map((cycle) => {
            if (cycle.id == activeCycleId) {
                return { ...cycle, interruptedDate: new Date() }
            }
            else { return cycle }
        })
        )
    }

    return (
        <CyclesContext.Provider
            value={
                {
                    cycles,
                    activeCycle,
                    activeCycleId,
                    amountSecondsPassed,
                    markCurrentCycleAsFinished,
                    setSecondsPassed,
                    createNewCycle,
                    interruptCycle
                }
            }
        >
            {children}
        </CyclesContext.Provider>
    )
}