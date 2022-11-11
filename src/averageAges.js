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
function sumAndRound(arrayOfReduce) {
  const sumAges = arrayOfReduce.reduce((sum, age) => sum + age, 0);

  return Math.round((sumAges / arrayOfReduce.length) * 100) / 100;
}

function calculateMenAverageAge(people, century) {
  const arrayOfAges = century
    ? people
      .filter(person => {
        return (Math.ceil(person.died / 100) === century) && person.sex === 'm';
      })
      .map((person) => person.died - person.born)
    : people
      .filter((person) => person.sex === 'm')
      .map(({ died, born }) => died - born);

  return sumAndRound(arrayOfAges);
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
  const filteredWomen = withChildren
    ? people
      .filter(person => people.some(({ mother }) => mother === person.name))
    : people
      .filter(({ sex }) => sex === 'f');

  const arrWomenAges = filteredWomen.map(
    (person) => {
      return person.died - person.born;
    });

  return sumAndRound(arrWomenAges);
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
  const children = onlyWithSon
    ? people
      .filter((person) => {
        return (
          person.mother != null
            && person.sex === 'm'
              && people.some(({ name }) => name === person.mother)
        );
      })
    : people
      .filter((person) => {
        return (
          person.mother != null
            && people.some(({ name }) => name === person.mother)
        );
      });

  const arrayYears = children.map((person) => {
    const mother = people.find((women) => women.name === person.mother);

    return (person.born - mother.born);
  });

  return sumAndRound(arrayYears);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
