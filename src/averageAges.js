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

function calculateAverageAge(person) {
  const liveDurationSum = person.reduce((acc, curr) =>
    acc + (curr.died - curr.born), 0);

  return liveDurationSum / person.length;
};

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => {
    const isMale = person.sex === 'm';

    return century
      ? isMale && Math.ceil(person.died / 100) === century
      : isMale;
  });

  return calculateAverageAge(men);
}

// learn how to use array methods like .filter .map .some .every .find .reduce
// avoid using loop and forEach
// replace `if ()` statement with &&, || or ?:
// without nesting

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
  const womenWithChild = people.filter((person) => {
    const isFemale = person.sex === 'f';
    const withChild = people.find(child => child.mother === person.name);

    return withChildren
      ? isFemale && withChild
      : isFemale;
  });

  return calculateAverageAge(womenWithChild);
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
  const motherSons = people.filter((person) => {
    const isMale = person.sex === 'm';
    const motherWithSons = people.some((mother) =>
      person.mother === mother.name);

    return onlyWithSon
      ? isMale && motherWithSons
      : motherWithSons;
  });

  const differenceAge = motherSons.map((person) =>
    person.born - people.find((mother) =>
      person.mother === mother.name).born);

  return differenceAge.reduce((acc, curr) => acc + curr, 0)
    / differenceAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
