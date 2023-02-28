'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

const calculateAverage = (prev, obj, index, array) => prev + obj / array.length;
const calculateAverageAge = (prev, obj, index, array) =>
  prev + (obj.died - obj.born) / array.length;

const calculateCentury = obj => Math.ceil(obj / 100);
const filterMan = obj => obj.sex === 'm';

const filterWoman = obj => obj.sex === 'f';
const findMotherNames = obj => obj.map(el => el.mother);

function calculateMenAverageAge(people, century) {
  return arguments.length < 2
    ? people
      .filter(filterMan)
      .reduce(calculateAverageAge, 0)

    : people
      .filter(el => calculateCentury(el.died) === century && filterMan(el))
      .reduce(calculateAverageAge, 0);
}

// without nesting

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const checkMotherInArray = el => findMotherNames(people).includes(el.name);

  return arguments.length < 2
    ? people
      .filter(filterWoman)
      .reduce(calculateAverageAge, 0)

    : people
      .filter(checkMotherInArray)
      .reduce(calculateAverageAge, 0);
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */

function calculateAverageAgeDiff(people, onlyWithSon) {
  const findMotherFilter
  = person => people.find(pers => pers.name === person.mother);
  const changeForDiff
  = el => el.born - people.find(elem => elem.name === el.mother).born;

  const FinMotherAndManFilter = el => findMotherFilter(el) && filterMan(el);

  return arguments.length < 2
    ? people
      .filter(findMotherFilter)
      .map(changeForDiff)
      .reduce(calculateAverage, 0)

    : people
      .filter(FinMotherAndManFilter)
      .map(changeForDiff)
      .reduce(calculateAverage, 0);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
