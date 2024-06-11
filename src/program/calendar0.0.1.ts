export function calendar(year: number, month: number, day: number): string {
    if (year < 1900 || year > 2100) {
        return ''
    }

    if (month < 1 || month > 12) {
        return ''
    }

    const monthDays: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    let isRun: boolean = false

    if (year % 100 != 0 && year % 4 == 0) {
        isRun = true
    } else if (year % 400 == 0) {
        isRun = true
    }

    if (isRun) {
        monthDays[2 - 1] ++
    }

    if (day < 1 || day > monthDays[month - 1]) {
        return ''
    }

    if (day === monthDays[month - 1] && month != 12) {
        day = 1
        month = month + 1
    } else if (day === monthDays[month - 1] && month === 12) {
        day = 1
        month = 1
        year = year + 1
    }

    return year + '-' + month + '-' + day
}