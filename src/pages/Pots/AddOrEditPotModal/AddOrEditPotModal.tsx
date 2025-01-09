import Button from '@components/Button/Button'
import DropDown from '@components/DropDown/DropDown'
import Input from '@components/Input/Input'
import Modal from '@components/Modal/Modal'
import Text from '@components/Text/Text'
import CaretDownIcon from '@images/icon-caret-down.svg?react'
import CloseIcon from '@images/icon-close-modal.svg?react'
import { ChangeEventHandler, FormEventHandler, useState } from 'react'
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
    const [charactersLeft, setCharactersLeft] = useState(
        pot ? 30 - pot.name.length : 30
    )

    const onPotNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setCharactersLeft(30 - event.target.value.length)
    }

    const onSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)
        const formEntries = Object.fromEntries(formData.entries())
        console.log('formEntries:', formEntries)
    }

    return (
        <Modal.Container isOpen={isOpen} onClose={onClose}>
            <Modal.Header className='flex justify-between items-center'>
                <Text fontSize='xl' fontStyle='bold' color='pfa-grey-900'>
                    {pot ? 'Edit Pot' : 'Add New Pot'}
                </Text>
                <CloseIcon className='hover:cursor-pointer' onClick={onClose} />
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
                    />
                    <Input
                        id='target'
                        name='target'
                        type='number'
                        defaultValue={pot ? pot.target : undefined}
                        placeholder='e.g. 2000'
                        label='Target'
                        prefixComponent={
                            <Text fontSize='sm' color='pfa-beige-500'>
                                $
                            </Text>
                        }
                    />
                    <DropDown
                        className='w-full !-translate-x-0 shadow-lg'
                        ButtonComponent={
                            <Input
                                id='colorTag'
                                name='colorTag'
                                defaultValue={pot ? pot.theme : 'Green'}
                                label='Theme'
                                prefixComponent={
                                    <div
                                        style={{
                                            backgroundColor:
                                                pot?.theme || '#277C78',
                                        }}
                                        className='w-4 h-4 rounded-full'
                                    />
                                }
                                icon={<CaretDownIcon />}
                                readOnly
                            />
                        }
                    >
                        {Object.keys(colorMap).map((colorName) => (
                            <div
                                key={colorName}
                                className='flex items-center gap-3'
                            >
                                <div
                                    style={{
                                        backgroundColor: colorMap[colorName],
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
                            </div>
                        ))}
                    </DropDown>
                    <Button.Primary className='w-full' type='submit'>
                        {pot ? 'Save Changes' : 'Add Pot'}
                    </Button.Primary>
                </form>
            </Modal.Body>
        </Modal.Container>
    )
}
