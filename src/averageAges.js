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
  const gender = people.filter(person => {
    return century
      ? person.sex === 'm'
        && Math.ceil(person.died / 100) === century
      : person.sex === 'm';
  });

  return repetitive(gender);
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
  const woman = people.filter(person => {
    return withChildren
      ? people.some(kid => kid.mother === person.name)
      : person.sex === 'f';
  });

  return repetitive(woman);
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
  const pupils = people.filter(child => {
    return onlyWithSon
      ? child.sex === 'm' && people.some(mom => mom.name === child.mother)
      : people.some(mom => mom.name === child.mother);
  });
  const age = pupils.map(kid => {
    const mother = people.find(mom => mom.name === kid.mother);

    return mother.born - kid.born;
  });

  const result = age.reduce((prev, curr) =>
    prev - curr, 0) / age.length;

  return result;
}

function repetitive(men) {
  const age = men.map((person) => person.died - person.born);

  const result = age.reduce((prev, curr) =>
    prev + curr, 0) / age.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
