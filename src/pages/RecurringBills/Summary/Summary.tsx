import Text from '@components/Text/Text'
import useRecurringBillsData from '@hooks/useRecurringBillsData'
import clsx from 'clsx'

export default function Summary() {
    const { summary } = useRecurringBillsData()

    return (
        <div
            className={clsx(
                'p-4',
                'bg-pfa-white rounded-xl',
                'flex flex-col gap-5 tablet:max-desktop:grow-[0.5]'
            )}
        >
            <Text fontSize='base' fontStyle='bold' color='pfa-grey-900'>
                Summary
            </Text>
            <div className='flex flex-col gap-4'>
                {Object.entries(summary).map(
                    ([billType, _summary], index, bills) => (
                        <div key={billType} className='flex flex-col gap-4'>
                            <div className='flex justify-between items-center'>
                                <Text>{billType}</Text>
                                <Text
                                    fontStyle='bold'
                                    color={
                                        index !== bills.length - 1
                                            ? 'pfa-grey-900'
                                            : 'pfa-red'
                                    }
                                >
                                    {`${
                                        _summary.bills.length
                                    } ($${_summary.total.toLocaleString(
                                        undefined,
                                        { minimumFractionDigits: 2 }
                                    )})`}
                                </Text>
                            </div>
                            {index !== bills.length - 1 && (
                                <div className='h-[1px] bg-pfa-grey-500/15' />
                            )}
                        </div>
                    )
                )}
            </div>
        </div>
    )
}
