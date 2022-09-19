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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const man = people.filter(person => person.sex === 'm');

  const manAvgAge = century
    ? man
      .filter(person => Math.ceil(person.died / 100) === century)
      .reduce((memo, person) => memo + (person.died - person.born), 0)
      / man.filter(person => Math.ceil(person.died / 100) === century).length
    : man.reduce((memo, person) => memo + (person.died - person.born), 0)
      / man.length;

  return manAvgAge;
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
  // write code here
  const woman = withChildren
    ? people
      .filter((person, i, array) => person.sex === 'f'
        && array.some(a => a.mother === person.name))
    : people.filter(person => person.sex === 'f');
  const womanAvgAge = woman
    .reduce((memo, person) => memo + (person.died - person.born), 0)
      / woman.length;

  return womanAvgAge;
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
  // write code here
  const peopleWithAgeDiff = people.map((person, i, array) => {
    const momIndex = array.findIndex(a => a.name === person.mother);

    if (momIndex !== -1) {
      person.ageDiff = person.born - array[momIndex].born;
    }

    return person;
  }).filter(a => a.ageDiff);

  const childWithAgeDiff = onlyWithSon
    ? peopleWithAgeDiff.filter(a => a.sex === 'm')
    : peopleWithAgeDiff;

  const AvgAgeDiff = childWithAgeDiff
    .reduce((memo, child) => memo + child.ageDiff, 0)
    / childWithAgeDiff.length;

  return Number(AvgAgeDiff.toFixed(2));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
