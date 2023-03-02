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
  const personMen = (person) => century
    ? person.sex === 'm' && century === Math.ceil(person.died / 100)
    : person.sex === 'm';

  const age = (sum, person) => sum + (person.died - person.born);
  const men = people.filter(personMen);
  const result = men.reduce(age, 0) / men.length;

  return result;
};

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
  const arr = (person) => withChildren
    ? person.sex === 'f' && people.some(child => child.mother === person.name)
    : person.sex === 'f';

  const age = (sum, person) => sum + (person.died - person.born);
  const women = people.filter(arr);
  const result = women.reduce(age, 0) / women.length;

  return result;
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
  const arr = onlyWithSon
    ? people.filter(person => person.sex === 'm')
    : people;

  const children = arr.filter(
    person => people.some(mother => mother.name === person.mother)
  );

  const pairs = children.map((child) =>
    ([child, people.find((mother) => mother.name === child.mother)]));

  const sum = pairs.reduce((diff, x) => diff + x[0].born - x[1].born, 0);

  const result = sum / pairs.length;

  return result;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
