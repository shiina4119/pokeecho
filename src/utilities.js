export function createRandomArray(size) {
    let arr = []
    while (arr.length < size) {
	let x = Math.floor(Math.random() * 600) + 1
	if (arr.indexOf(x) === -1) arr.push(x)
    }
    return arr;
}

export const shuffleArray = arr => arr.sort(() => Math.random() - 0.5)
