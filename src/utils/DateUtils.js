export function logIfDateIsBeforeJuly5th2024(date) {
    console.log(date);
    const july5th2024 = new Date('2024-07-05');
    if (date < july5th2024) {
        console.log('Date is before July 5th, 2024:', date);
    }
}
