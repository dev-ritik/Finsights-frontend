export const DURATIONS = {
    All: 'All',
    Day: 'Day',
    Yesterday: 'Yesterday',
    Week: 'Week',
    Month: 'Month',
    Quarter: 'Quarter',
    HalfYear: 'HalfYear',
    Year: 'Year',
    // Custom: 'Custom',
}

const TODAY = new Date();

// Helper function for subtracting days
const subtractDays = (days) => {
    const d = new Date(TODAY);
    d.setDate(d.getDate() - days);
    return d;
};

// Helper function for subtracting months
const subtractMonths = (months) => {
    const d = new Date(TODAY);
    d.setMonth(d.getMonth() - months);
    return d;
};

export const DURATION_DETAILS = {
    [DURATIONS.All]: {
        from: null, // Means no limit
        to: TODAY,
    },
    [DURATIONS.Day]: {
        from: subtractDays(1),
        to: TODAY,
    },
    [DURATIONS.Yesterday]: {
        from: subtractDays(2),
        to: subtractDays(1),
    },
    [DURATIONS.Week]: {
        from: subtractDays(7),
        to: TODAY,
    },
    [DURATIONS.Month]: {
        from: subtractMonths(1),
        to: TODAY,
    },
    [DURATIONS.Quarter]: {     // Last 3 months
        from: subtractMonths(3),
        to: TODAY,
    },
    [DURATIONS.HalfYear]: {    // Last 6 months
        from: subtractMonths(6),
        to: TODAY,
    },
    [DURATIONS.Year]: {        // Last 12 months
        from: subtractMonths(12),
        to: TODAY,
    },
    // [DURATIONS.Custom]: {
    //     from: TODAY,  // Can be modified
    //     to: TODAY,  // Can be modified
    // }
};
