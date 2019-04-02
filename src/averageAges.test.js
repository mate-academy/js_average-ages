'use strict';

const people = require('./people');
const {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff
} = require('./averageAges');

test('Average men age', () => {
    expect(+calculateMenAverageAge(people).toFixed(2)).toBe(61.67);
});

test('Average men age in 18 century', () => {
  expect(+calculateMenAverageAge(people, 18).toFixed(2)).toBe(56.50);
});

test('Average women age', () => {
  expect(+calculateWomenAverageAge(people).toFixed(2)).toBe(54.56);
});

test('Average mothers age', () => {
  expect(+calculateWomenAverageAge(people, true).toFixed(2)).toBe(54.15);
});

test('Average age difference', () => {
  expect(+calculateAverageAgeDiff(people).toFixed(2)).toBe(31.22);
});

test('Average age difference with son', () => {
  expect(+calculateAverageAgeDiff(people, true).toFixed(2)).toBe(30.08);
});

