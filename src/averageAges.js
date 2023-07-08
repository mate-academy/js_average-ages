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
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting

  const men = people.filter(person => {
    return century !== undefined
      ? person.sex === 'm' && century === Math.ceil(person.died / 100)
      : person.sex === 'm';
  });

  const totalAge = men.reduce((sum, item) => {
    return sum + (item.died - item.born);
  }, 0);

  return +(totalAge / men.length).toFixed(2);
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
  const women = people.filter(person => {
    return withChildren !== undefined
      ? person.sex === 'f' && people.some(item => item.mother === person.name)
      : person.sex === 'f';
  });

  const totalAge = women.reduce((sum, item) => {
    return sum + (item.died - item.born);
  }, 0);

  return +(totalAge / women.length).toFixed(2);
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
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value

  const mothers = people.filter(person => {
    return people.some(item => item.mother === person.name);
  });

  const peopleWithMother = people.filter(person => {
    return onlyWithSon !== undefined
      ? mothers.find(mother => mother.name === person.mother)
        && person.sex === 'm'
      : mothers.find(mother => mother.name === person.mother);
  });

  const totalAgeDiff = peopleWithMother.reduce((sum, person) => {
    const mother = mothers.find(item => item.name === person.mother);

    return sum + (person.born - mother.born);
  }, 0);

  return +(totalAgeDiff / peopleWithMother.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
