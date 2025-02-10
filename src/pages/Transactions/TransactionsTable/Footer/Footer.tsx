import Button from '@components/Button/Button'
import Text from '@components/Text/Text'
import { ViewportObserver } from '@contexts/ViewportObserver/ViewportObserver.context'
import PrevIcon from '@icons/icon-caret-left.svg?react'
import NextIcon from '@icons/icon-caret-right.svg?react'
import clsx from 'clsx'
import { Dispatch, SetStateAction, useContext, useState } from 'react'

export default function Footer({
    pages,
    onPageChange
}: {
    pages: number
    onPageChange: Dispatch<SetStateAction<number>>
}) {
    const { isMobile } = useContext(ViewportObserver)

    const [selectedPage, setSelectedPage] = useState('1')

    let pageNumbers: string[] = []
    if (isMobile) {
        switch (selectedPage) {
            case '1':
            case '2':
                pageNumbers = ['1', '2', '...', pages.toString()]
                break
            case (pages - 1).toString():
            case pages.toString():
                pageNumbers = [
                    '1',
                    '...',
                    (pages - 1).toString(),
                    pages.toString()
                ]
                break
            default:
                pageNumbers = ['...', selectedPage, '...', pages.toString()]
                break
        }
    } else if (pages > 5) {
        switch (selectedPage) {
            case '1':
            case '2':
            case (pages - 1).toString():
            case pages.toString():
                pageNumbers = [
                    '1',
                    '2',
                    '...',
                    (pages - 1).toString(),
                    pages.toString()
                ]
                break
            default:
                pageNumbers = [
                    '1',
                    '...',
                    selectedPage,
                    '...',
                    pages.toString()
                ]
                break
        }
    } else {
        pageNumbers = ['1', '2', '3', '4', '5']
    }

    return (
        <div className='flex items-center justify-between pt-6'>
            <Button.Pagination
                leftIcon={
                    <PrevIcon className='transition-colors duration-300 text-pfa-beige-500 group-hover:text-pfa-white' />
                }
                onClick={() => {
                    setSelectedPage((prevPage) =>
                        Number(prevPage) === 1
                            ? prevPage
                            : (Number(prevPage) - 1).toString()
                    )
                    onPageChange((prevPage) =>
                        prevPage === 1 ? prevPage : prevPage - 1
                    )
                }}
            >
                {!isMobile && (
                    <Text
                        className='transition-colors duration-300 text-pfa-grey-900 group-hover:text-pfa-white'
                        fontSize='sm'
                    >
                        Prev
                    </Text>
                )}
            </Button.Pagination>
            <div className='flex gap-2'>
                {pageNumbers.map((pageNumber, index) => (
                    <div
                        key={index}
                        className={clsx(
                            'h-10 w-10 transition-colors duration-300',
                            'flex items-center justify-center',
                            'rounded-lg',
                            'group',
                            {
                                'border-[1px] border-pfa-beige-500 bg-pfa-white':
                                    selectedPage !== pageNumber,
                                'hover:cursor-pointer hover:bg-pfa-beige-500 hover:border-0':
                                    pageNumber !== '...',
                                'bg-pfa-grey-900 hover:bg-pfa-grey-900':
                                    selectedPage === pageNumber
                            }
                        )}
                        onClick={
                            pageNumber !== '...'
                                ? () => {
                                      setSelectedPage(pageNumber)
                                      onPageChange(Number(pageNumber))
                                  }
                                : undefined
                        }
                    >
                        <Text
                            className={clsx('transition-colors duration-300', {
                                'text-pfa-grey-900':
                                    selectedPage !== pageNumber,
                                'text-pfa-white': selectedPage === pageNumber,
                                'group-hover:text-pfa-white':
                                    pageNumber !== '...'
                            })}
                            fontSize='sm'
                        >
                            {pageNumber}
                        </Text>
                    </div>
                ))}
            </div>
            <Button.Pagination
                rightIcon={
                    <NextIcon className='transition-colors duration-300 text-pfa-beige-500 group-hover:text-pfa-white' />
                }
                onClick={() => {
                    setSelectedPage((prevPage) =>
                        Number(prevPage) >= pages
                            ? prevPage
                            : (Number(prevPage) + 1).toString()
                    )
                    onPageChange((prevPage) =>
                        prevPage >= pages ? prevPage : prevPage + 1
                    )
                }}
            >
                {!isMobile && (
                    <Text
                        className='transition-colors duration-300 text-pfa-grey-900 group-hover:text-pfa-white'
                        fontSize='sm'
                    >
                        Next
                    </Text>
                )}
            </Button.Pagination>
        </div>
    )
}
