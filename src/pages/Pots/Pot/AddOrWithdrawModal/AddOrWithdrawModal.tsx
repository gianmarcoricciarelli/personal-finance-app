import Button from '@components/Button/Button'
import Input from '@components/Input/Input'
import Modal from '@components/Modal/Modal'
import ProgressBar from '@components/ProgressBar/ProgressBar'
import Text from '@components/Text/Text'
import DataContext from '@contexts/Data/Data.context'
import CloseIcon from '@icons/icon-close-modal.svg?react'
import {
    ChangeEventHandler,
    FormEventHandler,
    useContext,
    useState
} from 'react'
import { z } from 'zod'
import { colorMap, Pot } from '../../../../types'

export default function AddOrWithdrawModal({
    operation,
    pot,
    isOpen,
    onClose
}: {
    operation: 'add' | 'withdraw'
    pot: Pot
    isOpen: boolean
    onClose: () => void
}) {
    const { setData } = useContext(DataContext)

    const [amount, setAmount] = useState('')
    const [error, setError] = useState<string | undefined>()

    function reset() {
        setAmount('')
        setError(undefined)
        onClose()
    }

    const onAmountChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const validatedInput = z.coerce.number().safeParse(event.target.value)

        if (!validatedInput.success) {
            setError('You must insert a valid amount')
            setAmount(event.target.value)
        } else {
            setError(undefined)

            if (
                operation === 'add' &&
                pot.total + validatedInput.data >= pot.target
            ) {
                setAmount((pot.target - pot.total).toString())
            } else if (
                operation === 'withdraw' &&
                validatedInput.data >= pot.total
            ) {
                setAmount(pot.total.toString())
            } else {
                setAmount(event.target.value)
            }
        }
    }

    const onSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()

        const formEntries = Object.fromEntries(
            new FormData(event.target as HTMLFormElement).entries()
        )
        const validatedInput = z.coerce.number().safeParse(formEntries.amount)

        if (!validatedInput.success) {
            setError('You must insert a valid amount')
        } else {
            setData!((prevData) => {
                for (let i = 0; i < prevData.pots.length; i++) {
                    if (prevData.pots[i].name === pot.name) {
                        prevData.pots[i].total =
                            operation === 'add'
                                ? prevData.pots[i].total + Number(amount)
                                : prevData.pots[i].total - Number(amount)
                    }
                }
                return prevData
            })
            reset()
        }
    }

    let newAmount = pot.total.toFixed(2)
    let percentages = [pot.total, 0]
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
            operation === 'add' ? colorMap['Green'] : colorMap['Red']
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
                        total={pot.target}
                    />
                    <div className='flex justify-between items-center'>
                        <Text
                            color={
                                operation === 'add' ? 'pfa-green' : 'pfa-red'
                            }
                        >
                            {operation === 'add'
                                ? `${
                                      Number(newAmount) !== pot.total
                                          ? (
                                                (Number(newAmount) /
                                                    pot.target) *
                                                100
                                            ).toFixed(2)
                                          : '0.00'
                                  }%`
                                : `${
                                      Number(newAmount) !== pot.total
                                          ? (
                                                (Number(amount) / pot.total) *
                                                100
                                            ).toFixed(2)
                                          : '0.00'
                                  }%`}
                        </Text>
                        <Text>{`Target of $${pot.target.toLocaleString()}`}</Text>
                    </div>
                </div>
                <form
                    className='flex flex-col gap-5'
                    onSubmit={onSubmitHandler}
                >
                    <Input
                        id='amount'
                        name='amount'
                        value={amount}
                        onChange={onAmountChange}
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
