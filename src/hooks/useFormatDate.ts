export default function useFormatDate(date: string): string {
    const _date = new Date(date)
    const month = _date.toDateString().split(' ')[1]

    return `${_date.getDate()} ${month} ${_date.getFullYear()}, ${_date.getHours()}:${_date.getSeconds()}`
}
