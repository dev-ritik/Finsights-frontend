
export const DURATIONS = {
    All: 'All',
    Day: 'Day',
    Yesterday: 'Yesterday',
    Week: 'Week',
    Month: 'Month',
    Quarter: 'Quarter',
    Year: 'Year',
    // Custom: 'Custom',
}

const TODAY = new Date()

let YESTERDAY = new Date();
YESTERDAY.setDate(TODAY.getDate() - 1)

let LAST_WEEK = new Date();
LAST_WEEK.setDate(TODAY.getDate() - 7)

let LAST_MONTH = new Date();
LAST_MONTH.setMonth(TODAY.getMonth() - 1)

let LAST_YEAR = new Date();
LAST_YEAR.setFullYear(TODAY.getFullYear() - 1);

const THIS_QUARTER = new Date(TODAY.getFullYear(), Math.floor(TODAY.getMonth() / 3) * 3, 1);

export const DURATION_DETAILS = {
    [DURATIONS.All]: {
        from: TODAY,  // Unused
        to: TODAY,  // Unused
    },
    [DURATIONS.Day]: {
        from: TODAY,
        to: TODAY,
    },
    [DURATIONS.Yesterday]: {
        from: YESTERDAY,
        to: TODAY,
    },
    [DURATIONS.Week]: {
        from: LAST_WEEK,
        to: TODAY,
    },
    [DURATIONS.Month]: {
        from: LAST_MONTH,
        to: TODAY,
    },
    [DURATIONS.Quarter]: {
        from: THIS_QUARTER,
        to: TODAY,
    },
    [DURATIONS.Year]: {
        from: LAST_YEAR,
        to: TODAY,
    },
    // [DURATIONS.Custom]: {
    //     from: TODAY,  // Can be modified
    //     to: TODAY,  // Can be modified
    // }
}
