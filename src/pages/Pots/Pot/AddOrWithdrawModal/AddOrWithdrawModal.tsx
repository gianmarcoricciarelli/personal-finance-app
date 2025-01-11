import Button from '@components/Button/Button'
import Input from '@components/Input/Input'
import Modal from '@components/Modal/Modal'
import ProgressBar from '@components/ProgressBar/ProgressBar'
import Text from '@components/Text/Text'
import CloseIcon from '@images/icon-close-modal.svg?react'
import { ChangeEventHandler, useState } from 'react'
import { z } from 'zod'
import { colorMap, Pot } from '../../../../types'

export default function AddOrWithdrawModal({
    operation,
    pot,
    isOpen,
    onClose,
}: {
    operation: 'add' | 'withdraw'
    pot: Pot
    isOpen: boolean
    onClose: () => void
}) {
    const [amount, setAmount] = useState('')
    const [error, setError] = useState<string | undefined>()

    const onAmountChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setAmount(event.target.value)
        const validatedInput = z.coerce.number().safeParse(event.target.value)

        if (!validatedInput.success) {
            setError('You must insert a valid amount')
        } else if (error) {
            setError(undefined)
        }
    }

    function reset() {
        setAmount('')
        onClose()
    }

    let newAmount = pot.total.toFixed(2)
    let percentages: number | number[] = pot.total
    let colors: string | string[] = 'Dark Grey'
    if (!error) {
        newAmount =
            operation === 'add'
                ? (Number(newAmount) + Number(amount)).toFixed(2)
                : (Number(newAmount) - Number(amount)).toFixed(2)
        percentages =
            operation === 'add'
                ? [pot.total, Number(amount)]
                : [pot.total - Number(amount), Number(amount)]
        colors = [
            colorMap['Dark Grey'],
            operation === 'add' ? colorMap['Green'] : colorMap['Red'],
        ]
    }

    return (
        <Modal.Container isOpen={isOpen} onClose={reset}>
            <Modal.Header className='flex justify-between items-center'>
                <Text fontSize='xl' fontStyle='bold' color='pfa-grey-900'>
                    {operation === 'add'
                        ? `Add to ${pot.name}`
                        : `Withdraw from ${pot.name}`}
                </Text>
                <CloseIcon className='hover:cursor-pointer' onClick={reset} />
            </Modal.Header>
            <Modal.Body className='flex flex-col gap-5'>
                <Text fontSize='sm' color='pfa-grey-500'>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In
                    nisi neque, aliquet.
                </Text>
                <div className='flex flex-col gap-4'>
                    <div className='flex justify-between'>
                        <Text fontSize='sm'>New Amount</Text>
                        <Text
                            fontSize='xl'
                            fontStyle='bold'
                            color='pfa-grey-900'
                        >
                            {`$${newAmount}`}
                        </Text>
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <ProgressBar
                        height='xs'
                        percentages={percentages}
                        colors={colors}
                        total={
                            typeof percentages !== 'number'
                                ? pot.target
                                : undefined
                        }
                    />
                    <div className='flex justify-between items-center'>
                        <Text
                            color={
                                operation === 'add' ? 'pfa-green' : 'pfa-red'
                            }
                        >
                            {operation === 'add'
                                ? `${(
                                      (Number(newAmount) / pot.target) *
                                      100
                                  ).toFixed(2)}%`
                                : `${(
                                      (Number(amount) / pot.total) *
                                      100
                                  ).toFixed(2)}%`}
                        </Text>
                        <Text>{`Target of $${pot.target.toLocaleString()}`}</Text>
                    </div>
                </div>
                <form
                    className='flex flex-col gap-5'
                    // onSubmit={onSubmitHandler}
                >
                    <Input
                        id='amount'
                        name='amount'
                        label={
                            operation === 'add'
                                ? 'Amount to Add'
                                : 'Amount to Withdraw'
                        }
                        prefix={
                            <Text fontSize='sm' color='pfa-beige-500'>
                                $
                            </Text>
                        }
                        value={amount.toString()}
                        onChange={onAmountChange}
                        error={error}
                    />
                    <Button.Primary className='w-full' type='submit'>
                        {pot ? 'Save Changes' : 'Add Pot'}
                    </Button.Primary>
                </form>
            </Modal.Body>
        </Modal.Container>
    )
}
