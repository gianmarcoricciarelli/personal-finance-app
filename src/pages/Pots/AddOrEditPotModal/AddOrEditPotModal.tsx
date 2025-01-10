import Button from '@components/Button/Button'
import DropDown from '@components/DropDown/DropDown'
import Input from '@components/Input/Input'
import Modal from '@components/Modal/Modal'
import Text from '@components/Text/Text'
import DataContext from '@contexts/Data/Data.context'
import CaretDownIcon from '@images/icon-caret-down.svg?react'
import CloseIcon from '@images/icon-close-modal.svg?react'
import SelectedIcon from '@images/icon-selected.svg?react'
import {
    ChangeEventHandler,
    FormEventHandler,
    useContext,
    useState,
} from 'react'
import { z } from 'zod'
import { colorMap, Pot } from '../../../types'

export default function AddOrEditPotModal({
    pot,
    isOpen,
    onClose,
}: {
    pot?: Pot
    isOpen: boolean
    onClose: () => void
}) {
    const { data, setData } = useContext(DataContext)

    const usedColors = data.pots.map(
        (pot) =>
            Object.entries(colorMap).find(
                ([, value]) => value === pot?.theme
            )?.[0]
    )

    const [charactersLeft, setCharactersLeft] = useState(
        pot ? 30 - pot.name.length : 30
    )
    const [potColor, setPotColor] = useState(
        Object.entries(colorMap).find(
            ([, value]) => value === pot?.theme
        )?.[0] ||
            Object.keys(colorMap).find(
                (colorName) => !usedColors.includes(colorName)
            )
    )
    const [errors, setErrors] = useState<{
        potName?: string[]
        target?: string[]
        colorTag?: string[]
    }>({ potName: [], target: [], colorTag: [] })

    const onPotNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setErrors((prevErrors) => ({ ...prevErrors, potName: [] }))
        setCharactersLeft(30 - event.target.value.length)
    }

    const onTargetChange: ChangeEventHandler<HTMLInputElement> = () => {
        setErrors((prevErrors) => ({ ...prevErrors, target: [] }))
    }

    const onSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()

        const isEditMode = !!pot
        const formDataSchema = z.object({
            potName: z.string().min(1, 'You must provide a valid name'),
            target: z.coerce.number().gt(0, 'You must provide a valid amount'),
            colorTag: z.string().min(1),
        })
        const formData = new FormData(event.target as HTMLFormElement)
        const formEntries = Object.fromEntries(formData.entries())

        const validatedData = formDataSchema.safeParse(formEntries)
        if (!validatedData.success) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                ...validatedData.error.flatten().fieldErrors,
            }))
            return
        }

        if (isEditMode) {
            const newPots = data.pots
            const index = data.pots.findIndex(
                (pot) => pot.name === validatedData.data.potName
            )
            newPots[index] = {
                ...newPots[index],
                name: validatedData.data.potName,
                target: validatedData.data.target,
                theme: colorMap[validatedData.data.colorTag],
            }
            setData!({ ...data, pots: newPots })
            onClose()
        } else {
            setData!({
                ...data,
                pots: [
                    ...data.pots,
                    {
                        name: validatedData.data.potName,
                        target: validatedData.data.target,
                        theme: colorMap[validatedData.data.colorTag],
                        total: 0,
                    },
                ],
            })
            onClose()
        }
    }

    function reset() {
        setPotColor(
            Object.entries(colorMap).find(
                ([, value]) => value === pot?.theme
            )?.[0] ||
                Object.keys(colorMap).find(
                    (colorName) => !usedColors.includes(colorName)
                )
        )
        onClose()
    }

    return (
        <Modal.Container isOpen={isOpen} onClose={reset}>
            <Modal.Header className='flex justify-between items-center'>
                <Text fontSize='xl' fontStyle='bold' color='pfa-grey-900'>
                    {pot ? 'Edit Pot' : 'Add New Pot'}
                </Text>
                <CloseIcon className='hover:cursor-pointer' onClick={reset} />
            </Modal.Header>
            <Modal.Body className='flex flex-col gap-5'>
                <Text fontSize='sm' color='pfa-grey-500'>
                    {pot
                        ? 'If your saving targets change, feel free to update your pots.'
                        : 'Create a pot to set savings targets. These can help keep you on track as you save for special purchases.'}
                </Text>
                <form
                    className='flex flex-col gap-5'
                    onSubmit={onSubmitHandler}
                >
                    <Input
                        id='potName'
                        name='potName'
                        defaultValue={pot ? pot.name : undefined}
                        placeholder='e.g. Rainy Days'
                        maxLength={30}
                        label='Pot Name'
                        helperText={`${charactersLeft} characters left`}
                        onChange={onPotNameChange}
                        error={errors.potName?.[0]}
                    />
                    <Input
                        id='target'
                        name='target'
                        defaultValue={pot ? pot.target : undefined}
                        placeholder='e.g. 2000'
                        label='Target'
                        prefix={
                            <Text fontSize='sm' color='pfa-beige-500'>
                                $
                            </Text>
                        }
                        onChange={onTargetChange}
                        error={errors.target?.[0]}
                    />
                    <DropDown
                        className='w-full !-translate-x-0 shadow-lg'
                        ButtonComponent={
                            <Input
                                id='colorTag'
                                className='hover:cursor-pointer'
                                name='colorTag'
                                value={potColor}
                                label='Theme'
                                prefix={
                                    <div
                                        style={{
                                            backgroundColor: Object.entries(
                                                colorMap
                                            ).find(
                                                ([name]) => name === potColor
                                            )?.[1],
                                        }}
                                        className='w-4 h-4 rounded-full'
                                    />
                                }
                                icon={<CaretDownIcon />}
                                readOnly
                            />
                        }
                    >
                        {Object.keys(colorMap).map((colorName) => {
                            const isAlreadyUsed =
                                usedColors.includes(colorName) &&
                                colorName !== potColor
                            const isSelected = colorName === potColor

                            return (
                                <div
                                    key={colorName}
                                    className='flex items-center gap-3'
                                    onClick={
                                        isAlreadyUsed || isSelected
                                            ? undefined
                                            : () => setPotColor(colorName)
                                    }
                                >
                                    <div
                                        style={{
                                            backgroundColor:
                                                colorMap[colorName],
                                        }}
                                        className='w-4 h-4 rounded-full'
                                    />
                                    <Text
                                        className='grow'
                                        fontSize='sm'
                                        color='pfa-grey-900'
                                    >
                                        {colorName}
                                    </Text>
                                    {isSelected && <SelectedIcon />}
                                    {isAlreadyUsed && <Text>Already used</Text>}
                                </div>
                            )
                        })}
                    </DropDown>
                    <Button.Primary className='w-full' type='submit'>
                        {pot ? 'Save Changes' : 'Add Pot'}
                    </Button.Primary>
                </form>
            </Modal.Body>
        </Modal.Container>
    )
}
