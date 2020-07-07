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
    ? people.filter((human) => human.sex === 'm')
    : people.filter((human) => (human.sex === 'm')
    && (Math.ceil(human.died / 100) === century));

  const ageMen = men.map((man) => man.died - man.born);

  const middleAgeOfMen = ageMen.reduce((prev, current) => prev + current)
  / ageMen.length;

  return middleAgeOfMen;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  // write code here
  const women = (withChildren === undefined)
    ? people.filter((human) => (human.sex === 'f'))
    : people.filter((human) => (human.sex === 'f')
    && (people.find((child) => child.mother === human.name)));

  const ageWomen = women.map((woman) => woman.died - woman.born);

  const middleOfWomen = ageWomen.reduce((prev, current) =>
    (prev + current)) / ageWomen.length;

  return middleOfWomen;
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
  // write code here
  const children = (onlyWithSon === undefined)
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

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
