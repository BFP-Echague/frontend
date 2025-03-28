export function generateRandomHexColor() {
    const result: string[] = [];
    const hexRef = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

    for (let n = 0; n < 6; n++) {
        result.push(hexRef[Math.floor(Math.random() * 16)]);
    }
    return '#' + result.join('');
}