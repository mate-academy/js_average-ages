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
function calculateMenAverageAge(people, century = undefined) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  let arrFiltered = [];
  let lifeTime = [];
  let avargeAge = 0;

  (century === undefined)
    ? arrFiltered = people.filter(({ sex, died }) => ((sex === 'm')))
    : arrFiltered = people.filter(({ sex, died }) =>
      ((sex === 'm') && (Math.ceil(died / 100) === century)
      ));

  lifeTime = arrFiltered.map(({ born, died }) => died - born);

  avargeAge = lifeTime.reduce((sum, age) => sum + age);

  return ((avargeAge / lifeTime.length));
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
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
  let arrFiltered = [];
  let lifeTime = [];
  let avargeAge = 0;

  (withChildren === undefined)
    ? arrFiltered = people.filter(({ sex }) => ((sex === 'f')))
    : arrFiltered = people.filter(({ sex, name, mother }) =>
      ((sex === 'f') && (people.some((person) => person.mother === name))
      ));

  lifeTime = arrFiltered.map(({ born, died }) => died - born);

  avargeAge = lifeTime.reduce((sum, age) => sum + age);

  return ((avargeAge / lifeTime.length));
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
  let motherArr = [];
  let childArr = [];
  let ageDiffer = [];
  let avarageDiffer = 0;

  motherArr = people.filter(person =>
    (people.some((parent) => person.name === parent.mother)));

  (onlyWithSon === undefined)
    ? childArr = people.filter((child) =>
      (motherArr.some((parent) => parent.name === child.mother)))
    : childArr = people.filter((child) =>
      (motherArr.some((parent) =>
        (parent.name === child.mother) && (child.sex === 'm'))));

  ageDiffer = childArr.map((child) =>
    child.born - ((motherArr.find((mother) =>
      (child.mother === mother.name)).born)));

  avarageDiffer = ageDiffer.reduce((a, b) => a + b) / ageDiffer.length;

  return (avarageDiffer);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
