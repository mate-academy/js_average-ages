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
  const men = (century === undefined)
    ? people.filter((person) => person.sex === 'm')
    : people.filter((person) => (person.sex === 'm')
    && (Math.ceil(person.died / 100) === century));

  return getAverage(getAges(men));
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
  const women = !withChildren
    ? people.filter((human) => (human.sex === 'f'))
    : people.filter((human) => (human.sex === 'f')
    && (people.find((child) => child.mother === human.name)));

  return getAverage(getAges(women));
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
  const children = !onlyWithSon
    ? people.filter((child) => (people.find((mother) =>
      (child.mother === mother.name))))
    : people.filter((child) => (people.find((mother) =>
      ((child.mother === mother.name) && (child.sex === 'm')))));

  const agesMothersOfChildBirth = children.map((child) => {
    const mother = people.find((mamy) => mamy.name === child.mother);

    return child.born - mother.born;
  });

  const middleAgesOfMamys = agesMothersOfChildBirth.reduce((prev, current) =>
    (prev + current)) / agesMothersOfChildBirth.length;

  return middleAgesOfMamys;
}

const getAges = (men) => {
  return men.map((person) => person.died - person.born);
};

const getAverage = (callback) => {
  return callback.reduce((prev, current) => prev + current) / callback.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
