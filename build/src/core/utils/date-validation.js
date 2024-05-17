"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEndDate = exports.validateStartDate = void 0;
const moment_1 = __importDefault(require("moment")); // Import moment.js library
// Function to validate start date
const validateStartDate = (startDate) => {
    const currentDate = (0, moment_1.default)();
    return (0, moment_1.default)(startDate, 'MM/DD/YYYY').isAfter(currentDate, 'day');
};
exports.validateStartDate = validateStartDate;
// Function to validate end date
const validateEndDate = (endDate) => {
    const currentDate = (0, moment_1.default)();
    const twoYearsLater = (0, moment_1.default)(currentDate).add(2, 'years');
    const formattedEndDate = (0, moment_1.default)(endDate, 'MM/DD/YYYY');
    return formattedEndDate.isSameOrAfter(currentDate, 'day') && formattedEndDate.isBefore(twoYearsLater, 'day');
};
exports.validateEndDate = validateEndDate;
