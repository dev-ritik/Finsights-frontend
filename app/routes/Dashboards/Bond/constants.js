export const FREQUENCY = {
    ANNUALLY: ['Y', 'Annually'],
    SEMI_ANNUALLY: ['S', 'Semi Annually'],
    QUARTERLY: ['Q', 'Quarterly'],
    MONTHLY: ['M', 'Monthly'],
    ON_MATURITY: ['C', 'On Maturity'],
}
export const RATING = {
    AAA: [['AAA'], 'AAA'],
    AA: [['AA+', 'AA', 'AA-'], 'AA'],
    A: [['A+', 'A', 'A-'], 'A'],
    BBB: [['BBB+', 'BBB', 'BBB-'], 'BBB'],
}

export const TENURE_LEFT = {
    LESS_THAN_6_MONTH: ['6M', '< 6 Months'],
    LESS_THAN_1_YEAR: ['1Y', '0.5-1 Year'],
    LESS_THAN_3_YEAR: ['1-3Y', '1-3 Year'],
    LESS_THAN_5_YEAR: ['3-5Y', '3-5 Year'],
    MORE_THAN_5_YEAR: ['5Y+', '> 5 Year'],
}

export const SORT_BY = {
    NAME_ASC: 'Name: Ascending',
    NAME_DESC: 'Name: Descending',
    RETURNS: 'Returns (CAGR)',
    COUPON: 'Coupon',
    TENURE_ASC: 'Tenure: Ascending',
    TENURE_DESC: 'Tenure: Descending',
}