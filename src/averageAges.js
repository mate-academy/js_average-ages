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
  if (!century) {
    const arrOfMen = [...people].filter((person) => person.sex === 'm');

    const averageAges = arrOfMen.map((person) => person.died - person.born);

    return averageAges.reduce((accumulator, age) =>
      (accumulator + age
      ), 0) / averageAges.length;
  }

  const arrOfMenWithCentury = [...people].filter((person) =>
    person.sex === 'm' && Math.ceil(person.died / 100)
    === century);

  const averageAgesWithCentury = arrOfMenWithCentury.map((person) =>
    person.died - person.born);

  return averageAgesWithCentury.reduce((accumulator, age) =>
    (accumulator + age
    ), 0) / averageAgesWithCentury.length;
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
  // write code here
  if (!withChildren) {
    const arrOfWomen = [...people].filter((person) =>
      person.sex === 'f');

    const ages = arrOfWomen.map((person) =>
      person.died - person.born);

    return ages.reduce((accumulator, age) =>
      (accumulator + age
      ), 0) / ages.length;
  }

  const arrOfWomenWithChildren = [...people].filter((person) =>
    person.sex === 'f' && people.find((person1) =>
      person.name === person1.mother));

  const agesOfWomenWithChildren = arrOfWomenWithChildren.map((person) =>
    person.died - person.born);

  const result = agesOfWomenWithChildren.reduce((accumulator, age) =>
    (accumulator + age), 0) / agesOfWomenWithChildren.length;

  return Math.round(result * 100) / 100;
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
  if (!onlyWithSon) {
    const arrOfChildren = [...people].filter((person) =>
      people.find((person1) => person.mother === person1.name));

    const agesOfChildren = arrOfChildren.map((child) =>
      child.born - people.find((mother) => mother.name === child.mother).born);

    return agesOfChildren.reduce((accumulator, age) =>
      (accumulator + age
      ), 0) / agesOfChildren.length;
  }

  const arrOfSons = [...people].filter((person) =>
    person.sex === 'm' && people.find((person1) =>
      person.mother === person1.name));

  const agesOfSons = arrOfSons.map((child) =>
    child.born - people.find((mother) => mother.name === child.mother).born);

  return agesOfSons.reduce((accumulator, age) =>
    (accumulator + age
    ), 0) / agesOfSons.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
