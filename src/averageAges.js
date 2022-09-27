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
 *
 */
function getAverageAge(years) {
  return years.reduce((acumulator, person) => (
    acumulator + (person.died - person.born)
  ), 0) / years.length;
}

function calculateMenAverageAge(people, century) {
  let manList = people.filter(person => person.sex === 'm');

  if (century) {
    manList = manList.filter(
      person => Math.ceil(person.died / 100) === century);
  }

  return getAverageAge(manList);
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
  let womenList = people.filter(person => person.sex === 'f');
  const mothers = people.map(person => person.mother);

  if (withChildren) {
    womenList = people.filter(person => mothers.includes(person.name));
  }

  return getAverageAge(womenList);
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
  const diferAge = [];
  let peopleList = people;

  if (onlyWithSon) {
    peopleList = people.filter(person => person.sex === 'm');
  }

  peopleList.forEach((person) => {
    const mother = people.find(
      somebody => somebody.name === person.mother
    );

    if (mother) {
      diferAge.push(person.born - mother.born);
    }
  });

  const totalAgeDiff = diferAge.reduce((acumulator, diff) => (
    acumulator + diff
  ), 0);

  return totalAgeDiff / diferAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
