import React, { useContext } from 'react'
import { HandPalm, Play } from 'phosphor-react';
import {
    HomeContainer,
    StopCountDownButton,
    StartCountDownButton
} from './styles';

//Forms can be controlled and uncontrolled
import { FormProvider, useForm } from 'react-hook-form';
import { createContext, useEffect, useState } from 'react';
import { differenceInSeconds } from 'date-fns';
import { NewCycleForm } from '../../components/NewCycleForm';
import { CountDown } from '../../components/CountDown';

import { zodResolver } from '@hookform/resolvers/zod';
import zod from 'zod';

import { CyclesContext } from '../../contexts/CyclesContext';

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

interface CyclesContextType {
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
}

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number()
        .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
        .max(60, 'O ciclo máximo precisa ser de 60 minutos')
})

//brabo demais isto!!!
type newCycleFormFormData = zod.infer<typeof newCycleFormValidationSchema>

//export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {

    const { activeCycle, activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCycle } = useContext(CyclesContext)

    const newCycleForm = useForm<newCycleFormFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    const { handleSubmit, watch, reset } = newCycleForm

    function handleCreateNewCycle(data: newCycleFormFormData) {
        createNewCycle(data)
        reset()
    }

    const task = watch('task');
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">

                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <CountDown />

                {activeCycle ? (
                    <StopCountDownButton type="button" onClick={interruptCycle}>
                        <HandPalm />
                        Interromper
                    </StopCountDownButton>
                ) : (
                    < StartCountDownButton type="submit" disabled={isSubmitDisabled}>
                        <Play />
                        Começar
                    </StartCountDownButton>
                )}
            </form >
        </HomeContainer >
    )
}
