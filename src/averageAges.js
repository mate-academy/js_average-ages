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
  const sampleGroup
    = century !== undefined
      ? people.filter(x => x.sex === 'm' && Math.ceil(x.died / 100) === century)
      : people.filter(x => x.sex === 'm');

  function sumAge(total, person) {
    return total + (person.died - person.born);
  }

  const age = sampleGroup.reduce(sumAge, 0);

  return age / sampleGroup.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const sampleGroup
  = withChildren === true
    ? people.filter((x) => x.sex === 'f'
    && people.some(y => x.name === y.mother))
    : people.filter(x => x.sex === 'f');

  function sumAge(total, person) {
    return total + (person.died - person.born);
  }

  const age = sampleGroup.reduce(sumAge, 0);

  return age / sampleGroup.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(person => onlyWithSon
    ? people.some(child => child.name === person.mother) && person.sex === 'm'
    : people.find(child => child.name === person.mother)
  );

  const ageGaps = children.map(kid =>
    kid.born - people.find(child => child.name === kid.mother).born
  );

  return ageGaps.reduce((accumulator, element) =>
    accumulator + element) / ageGaps.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
