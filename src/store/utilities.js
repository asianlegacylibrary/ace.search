export function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export const parseLines = (text, term) => {
    let doubleComma = `(, ,)`
    let comma = `, `
    //let rr = new RegExp(`(\\n\\r)`)
    return text
        .replace(new RegExp(doubleComma, 'g'), `<br /><br />`)
        .replace(new RegExp(comma, 'g'), `<br />`)
        .replace(new RegExp(term, 'ig'), `<em>${term}</em>`)
}
