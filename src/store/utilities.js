export function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

/* PARSING FULL TEXT ************************************************
REGEX flags: 
- g (global), through entire string
- i (insensitive), make match case-insensitive
- m (multi-line), match over multi-lines (but how does this one work?)
*/

/* Parse lines of each page (as rendered on full text component)
---------------------------
TO-DO: FIND OUT FROM TRANSLATORS HOW TO PARSE TEXT PROPERLY
-- right now I'm just guessing
1. 
*/
export const parseLines = text => {
    let doubleComma = new RegExp(`(, ,)`, 'g')
    return text.replace(doubleComma, `<br /><br />`)
}

export const parseLinesAndHighlight = (text, term) => {
    let termRegex = new RegExp(`(${term})`, 'ig')
    let doubleComma = new RegExp(`(, ,)`, 'g')
    //let comma = `( ,)`
    //let rr = new RegExp(`(\\n\\r)`)
    return text
        .replace(termRegex, `<em>${term}</em>`)
        .replace(doubleComma, `<br /><br />`)
    //.replace(new RegExp(comma, 'g'), `<br />`)
}

/* Create pages from full text
------------------------------
1. split text on folio number (string > array)
2. loop over array and push @folios / associated text to object { id, data}
3. TO DO
- add a flag to object if there's a match with current term on that page
--- this will be used for NEXT / PREV match btns on full text component
*/
export const createPages = text => {
    let r = `(@[0-9]\\w+)` //`(@[0-9]//w+)
    let raw = text.split(new RegExp(r, 'g'))

    let o = []
    raw.forEach((a, i) => {
        if (raw.length - 1 > i) {
            if (a.charAt(0) === '@') {
                return o.push({ id: a, data: raw[i + 1] })
            }
        }
    })

    return o
}
