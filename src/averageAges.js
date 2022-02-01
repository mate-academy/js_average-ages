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
  const men = century
    ? people
      .filter(person => person.sex === 'm'
       && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  return men.reduce((sum, person) => sum
  + (person.died - person.born), 0) / men.length;
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
  const mothers = people.map(children => children.mother);
  const women = withChildren
    ? people
      .filter(person => person.sex === 'f'
       && mothers.includes(person.name))
    : people.filter(person => person.sex === 'f');

  return women.reduce((sum, person) => sum
    + (person.died - person.born), 0) / women.length;
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
  const men = people.filter(person => person.sex === 'm');
  const children = onlyWithSon
    ? men
    : people;

  const mothers = children
    .map(child => people.find(person => child.mother === person.name));

  const differenceBetweenAges = mothers.map((person, index) => {
    const momAge = person === undefined
      ? undefined
      : children[index].born - person.born;

    return momAge;
  }).filter(notUndefinedValues => notUndefinedValues !== undefined);

  return differenceBetweenAges.reduce((total, difference) => {
    return total + difference;
  }) / differenceBetweenAges.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
