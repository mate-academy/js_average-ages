'use strict';

const getAverage = (data) => (
  data.reduce((accumulator, element) => (
    accumulator + element
  ), 0) / data.length || 0
);

module.exports = getAverage;
