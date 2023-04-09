import React, { useContext } from 'react'
import {
    FormContainer,
    MinutesAmountInput,
    TaskInput,
} from './styles';

import { useForm, useFormContext } from 'react-hook-form';
import { CyclesContext } from '../../contexts/CyclesContext';

export function NewCycleForm(){

    const {activeCycle} = useContext(CyclesContext)
    const { register } =useFormContext()

    /* const { register, handleSubmit, watch, reset } = useForm<newCycleFormFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });*/

    return(
        <FormContainer>
                    <label>Vou trabalhar em:</label>
                    <TaskInput
                        id="task"
                        list="task-suggestions"
                        placeholder='Dê um nome para a tarefa'
                        disabled={!!activeCycle}
                        {...register('task')}
                    />

                    <datalist id="task-suggestions">
                        <option value="Projeto 01"></option>
                        <option value="Projeto 02"></option>
                        <option value="Projeto 03"></option>
                    </datalist>

                    <label htmlFor="minutesAmounts">duração:</label>
                    <MinutesAmountInput
                        type="number"
                        id="minutesAmount"
                        placeholder='00'
                        step={5}
                        min={5}
                        max={60}
                        disabled={!!activeCycle}
                        {...register('minutesAmount', { valueAsNumber: true })}
                    />
                    <span>minutos.</span>
                </FormContainer>
    )
}