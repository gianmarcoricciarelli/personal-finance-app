import { Transaction } from '../../../../types'

interface Bill extends Transaction {
    isPaid: boolean
}

export default function Bill({
    avatar,
    name,
    category,
    date,
    amount,
    isPaid,
}: Bill) {
    console.log('isPaid:', isPaid)
    return <div>{name}</div>
}
