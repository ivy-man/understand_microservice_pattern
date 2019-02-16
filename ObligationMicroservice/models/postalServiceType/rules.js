let rules = {
    fromPage: 'required|integer|min:1',
    toPage: 'required|integer|min:1',
    date: 'required|date',
    units: 'array',
    periods: 'required|array'
};

module.exports = rules;