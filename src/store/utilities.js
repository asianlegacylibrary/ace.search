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
    //let doubleComma = new RegExp(`(, ,)`, 'g')
    //return text.replace(doubleComma, `<br /><br />`)
    return text.split(', ,').join('\r\n')
}

// currently used for CARD DETAILS
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

    let matchTest = new RegExp(/<em/, 'g')
    let match = false

    if (raw.length === 1) {
        if (matchTest.test(raw[0])) {
            match = true
        }
        return [{ id: `@000`, termMatch: match, data: raw[0] }]
    }

    let o = []

    raw.forEach((a, i) => {
        match = false
        if (raw.length - 1 > i) {
            // check for <em and add MATCH! to obj
            if (matchTest.test(raw[i + 1])) {
                match = true
            }
            if (a.charAt(0) === '@') {
                return o.push({ id: a, termMatch: match, data: raw[i + 1] })
            }
        }
    })

    return o
}

// export const useADangCounter = (stateCountObject, referenceObject) => {
//     let count = stateCountObject
//     let max = referenceObject.length - 1

//     return {
//         value: count,
//         max: () =>
//             type === 'count'
//                 ? this.setState({ count: max })
//                 : this.setState({ matchCount: max }),
//         min: () => this.setState({ count: 0 }),
//         increase: () =>
//             count === max
//                 ? null
//                 : this.setState({ count: this.state.count + 1 }),
//         decrease: () =>
//             count === 0
//                 ? null
//                 : this.setState(prevState => ({
//                       count: prevState.count - 1,
//                   })),
//     }
// }
