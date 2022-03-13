export const generateRandomLetter = (): string => {
    const letters: string = 'abcdefghijklmnopqrstuvwxyz';
    return letters[Math.floor(Math.random() * letters.length)];
}