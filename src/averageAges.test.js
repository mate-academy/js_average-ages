'use strict';

const people = require('./people');
const {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
} = require('./averageAges');

test('Average men age', () => {
  expect(calculateMenAverageAge(people))
    .toBeCloseTo(61.67, 2);
});

test('Average men age in 18 century', () => {
  expect(calculateMenAverageAge(people, 18))
    .toBeCloseTo(56.50, 2);
});

test('Average women age', () => {
  expect(calculateWomenAverageAge(people))
    .toBeCloseTo(54.56, 2);
});

test('Average mothers age', () => {
  expect(calculateWomenAverageAge(people, true))
    .toBeCloseTo(54.15, 2);
});

test('Average age difference', () => {
  expect(calculateAverageAgeDiff(people))
    .toBeCloseTo(31.22, 2);
});

test('Average age difference with son', () => {
  expect(calculateAverageAgeDiff(people, true))
    .toBeCloseTo(30.08, 2);
});
