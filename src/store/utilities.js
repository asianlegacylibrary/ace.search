export function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function ID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return (
        '_' +
        Date.now().toString(36) +
        Math.random()
            .toString(36)
            .substr(2, 9)
    )
}

export function createBooleanBlocks(definition) {
    let blks = []
    let final = []
    let workingDefinition = [...definition]
    let i = 0
    do {
        if (workingDefinition[i].operator === 'OR') {
            let thisBlk = [...workingDefinition]
            thisBlk.splice(i + 1)
            thisBlk.pop()
            workingDefinition = workingDefinition.splice(i + 1)
            i = 0
            blks.push(thisBlk)
        } else {
            i += 1
        }
    } while (i < workingDefinition.length)
    blks.push(workingDefinition)

    blks.forEach(b => {
        final.push(groupBy(b, 'operator', 'term'))
    })

    return final
}

export function groupBy(data, key, valueOfInterest) {
    // `data` = array of objects,
    // `key` = property accessor to group
    // `valueOfInterest` = array of values for group
    if (Object.entries(data).length === 0 && data.constructor === Object) {
        return null
    }

    return data.reduce((storage, item) => {
        let group = item[key]
        // set `storage` for this instance of group to the outer scope
        // (if not empty) or initialize it
        storage[group] = storage[group] || []
        storage[group].push(item[valueOfInterest])
        return storage
    }, {})
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
export function getPagesAndCounts(text, highlight = false) {
    let count = 0
    if (highlight) {
        let rx = new RegExp(`(<\/em>)([,']?\\s+[,']?)(<em class="hlt1">)`, 'g')
        text = text.replace(rx, '$2')
        count = (text.match(/<em/g) || []).length
    }
    let r = new RegExp(`(@[0-9]\\s+|@[0-9]\\w+|@[a-z]\\s+|@[a-z]\\w+)`, 'g') //`(@[0-9]//w+)
    let raw = text.split(r) //new RegExp(r, 'g')

    let matchTest = new RegExp(/<em/, 'g')
    let match = false
    if (raw.length === 1) {
        if (matchTest.test(raw[0])) {
            match = true
        }
        return {
            pages: [{ id: `@000`, termMatch: match, data: raw[0] }],
            count: count,
        }
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
            } else {
                let pageID = null
                if (i === 0) {
                    pageID = '@000'
                } else {
                    pageID = `NO_ID_${i}`
                }
                if (
                    (a.length > 0 && a.charAt(0) !== '@' && i === 0) ||
                    (i > 0 &&
                        a.length > 0 &&
                        a.charAt(0) !== '@' &&
                        raw[i - 1].charAt(0) !== '@')
                ) {
                    if (matchTest.test(a)) {
                        match = true
                    }
                    return o.push({
                        id: pageID,
                        termMatch: match,
                        data: a,
                    })
                }
            }
        }
    })

    return { pages: o, count: count }
}
