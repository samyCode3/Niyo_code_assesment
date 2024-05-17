import moment from 'moment'; // Import moment.js library

// Function to validate start date
export const validateStartDate = (startDate: Date): boolean => {
    const currentDate = moment();
    return moment(startDate, 'MM/DD/YYYY').isAfter(currentDate, 'day');
};

// Function to validate end date
export const validateEndDate = (endDate: Date): boolean => {
    const currentDate = moment();
    const twoYearsLater = moment(currentDate).add(2, 'years');
    const formattedEndDate = moment(endDate, 'MM/DD/YYYY');
    return formattedEndDate.isSameOrAfter(currentDate, 'day') && formattedEndDate.isBefore(twoYearsLater, 'day');
};


