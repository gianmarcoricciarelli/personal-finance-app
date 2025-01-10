import Button from '@components/Button/Button'
import Modal from '@components/Modal/Modal'
import Text from '@components/Text/Text'
import DataContext from '@contexts/Data/Data.context'
import CloseIcon from '@images/icon-close-modal.svg?react'
import { useContext } from 'react'

export default function DeletePotModal({
    potName,
    isOpen,
    onClose,
}: {
    potName: string
    isOpen: boolean
    onClose: () => void
}) {
    const { data, setData } = useContext(DataContext)

    function onDestroyHandler() {
        const newPots = data.pots.filter((pot) => pot.name !== potName)
        setData!({ ...data, pots: newPots })
        onClose()
    }

    return (
        <Modal.Container isOpen={isOpen} onClose={onClose}>
            <Modal.Header className='flex justify-between items-center'>
                <Text
                    fontSize='xl'
                    fontStyle='bold'
                    color='pfa-grey-900'
                >{`Delete '${potName}'`}</Text>
                <CloseIcon className='hover:cursor-pointer' onClick={onClose} />
            </Modal.Header>
            <Modal.Body>
                <Text fontSize='sm' color='pfa-grey-500'>
                    Are you sure you want to delete this budget? This action
                    cannot be reversed, and all the data inside it will be
                    removed forever.
                </Text>
            </Modal.Body>
            <Modal.Footer className='flex flex-col gap-5 items-center'>
                <Button.Destroy className='w-full' onClick={onDestroyHandler}>
                    Yes, Confirm Deletion
                </Button.Destroy>
                <Button.Tertiary noIcon onClick={onClose}>
                    No, I want to go back
                </Button.Tertiary>
            </Modal.Footer>
        </Modal.Container>
    )
}
