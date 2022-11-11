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
 */

const getSumOfAges = (people) => people
  .map((person) => person.died - person.born)
  .reduce((a, b) => a + b);

const getAvarageAge = (people, sum) =>
  Math.round((sum / people.length) * 100) / 100;

const getGender = (people, gender = 'm') =>
  people.filter(({ sex }) => sex === gender);

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

const calculateMenAverageAge = (people, century) => {
  const allMen = getGender(people);

  const men = century
    ? allMen.filter(({ died }) => Math.ceil(died / 100) === century)
    : allMen;

  return getAvarageAge(men, getSumOfAges(men));
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
const calculateWomenAverageAge = (people, withChildren) => {
  const allWomen = getGender(people, 'f');

  const women = withChildren
    ? allWomen.filter(({ name }) =>
      people.find(({ mother }) => mother === name))
    : allWomen;

  return getAvarageAge(women, getSumOfAges(women));
};

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
const calculateAverageAgeDiff = (people, onlyWithSon) => {
  const allChildren = people.filter(({ mother }) =>
    people.find(({ name }) => name === mother));

  const sons = getGender(allChildren);

  const children = onlyWithSon ? sons : allChildren;

  const sumOfAges = children.reduce((sum, child) => {
    const mother = people.find((person) => person.name === child.mother);

    return sum + (child.born - mother.born);
  }, 0);

  return getAvarageAge(children, sumOfAges);
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
