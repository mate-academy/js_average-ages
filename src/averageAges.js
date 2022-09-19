'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  let manList = [];

  century === undefined
    ? manList = people.filter(person => person.sex === 'm')
    : manList = people.filter(
      person => Math.ceil(person.died / 100) === century && person.sex === 'm'
    );

  const manAverage = manList.reduce((acumulator, person) => {
    return acumulator + (person.died - person.born);
  }, 0);

  return manAverage / manList.length;
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let womenList = [];
  const mothers = [];

  people.map(person => mothers.push(person.mother));

  withChildren === undefined
    ? womenList = people.filter(person => person.sex === 'f')
    : womenList = people.filter(person => mothers.includes(person.name));

  const womenAverage = womenList.reduce((acumulator, person) => {
    return acumulator + (person.died - person.born);
  }, 0);

  return womenAverage / womenList.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const DiferAge = [];
  let peopleList = [];

  onlyWithSon === undefined
    ? peopleList = people
    : peopleList = people.filter(person => person.sex === 'm');

  peopleList.forEach((person) => {
    const mother = people.find(
      somebody => somebody.name === person.mother || false
    );

    if (mother) {
      DiferAge.push(person.born - mother.born);
    }
  });

  const AverageAgeDiff = DiferAge.reduce((acumulator, diff) => {
    return acumulator + diff;
  }, 0);

  return AverageAgeDiff / DiferAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
