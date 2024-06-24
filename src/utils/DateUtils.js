export function isDateBefore1900(date) {
    const january1st1900 = new Date('1900-01-01');
    return date < january1st1900;
}
