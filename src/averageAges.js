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
  const filteredMen = (century
    ? people.filter(({ died, sex }) =>
      Math.ceil(died / 100) === century
      && sex === 'm')
    : people.filter(({ sex }) => sex === 'm'));

  const sumOfMenAges = filteredMen.reduce((acc, { died, born }) => {
    const age = died - born;

    return acc + age;
  }, 0);

  return sumOfMenAges / filteredMen.length;
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
  const mothersNames = people
    .filter(({ mother }) => mother)
    .reduce((acc, person) => {
      return acc.concat(person.mother);
    }, []);

  const filteredWomen = withChildren
    ? people.filter(person =>
      mothersNames.includes(person.name)
      && person.sex === 'f')
    : people.filter(({ sex }) => sex === 'f');

  const sumOfAges = filteredWomen.reduce((acc, { died, born }) => {
    const age = died - born;

    return acc + age;
  }, 0);

  return sumOfAges / filteredWomen.length;
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
  const mothersNames = people
    .filter(({ mother }) => mother)
    .reduce((acc, person) => {
      return acc.concat(person.mother);
    }, []);

  const children = people.filter(person =>
    mothersNames.includes(person.mother));

  const filteredChildren = onlyWithSon
    ? children.filter(person => person.sex === 'm'
      && mothersNames.includes(person.mother))
    : children;

  const ageDiffs = filteredChildren.map(child => {
    const mother = people.find(person => person.name === child.mother);

    return mother ? child.born - mother.born : 0;
  });

  const nonZeroAgeDiffs = ageDiffs.filter(diff => diff !== 0);

  const totalAgeDiff = nonZeroAgeDiffs.reduce((acc, diff) => acc + diff, 0);

  const averageAgeDiff = totalAgeDiff / nonZeroAgeDiffs.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
