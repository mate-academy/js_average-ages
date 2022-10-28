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
  const males = people.filter(person => century
    ? Math.ceil(person.died / 100) === century && person.sex === 'm'
    : person.sex === 'm'
  );

  const ages = males.map(person => person.died - person.born);

  return calculateAverage(ages);
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
  const females = people.filter(person => withChildren
    ? people.some(child => child.mother === person.name) && person.sex === 'f'
    : person.sex === 'f'
  );

  const ages = females.map(person => person.died - person.born);

  return calculateAverage(ages);
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
  const children = people.filter(person => onlyWithSon
    ? people.some(woman => person.mother === woman.name) && person.sex === 'm'
    : people.some(woman => person.mother === woman.name)
  );

  const ages = children.map(child =>
    child.born - motherAge(people, child.mother)
  );

  return calculateAverage(ages);
}

function motherAge(people, motherName) {
  const mother = people.find(person => person.name === motherName);

  return mother.born;
}

function calculateAverage(value) {
  const totalAges = value.reduce((calculated, age) => calculated + age, 0);

  return totalAges / value.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
