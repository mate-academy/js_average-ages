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
  const men = people.filter(person => person.sex === 'm');

  const menForReduce = century
    ? men.filter(person => Math.ceil(person.died / 100) === century)
    : men;

  return menForReduce.reduce((sum, person, index, array) => {
    return sum + (person.died - person.born) / array.length;
  }, 0);
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
  const women = people.filter(person => person.sex === 'f');
  const womenForReduce = withChildren
    ? women.filter(person => people.some(child => child.mother === person.name))
    : women;

  return womenForReduce.reduce((sum, person, index, array) => {
    return sum + (person.died - person.born) / array.length;
  }, 0);
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
  const allChildren = people.filter(
    el => people.find(mother => el.mother === mother.name)
  );
  const onlyBoys = allChildren.filter(child => child.sex === 'm');

  const children = onlyWithSon ? onlyBoys : allChildren;

  const sumOfDifference = children.reduce((sum, el) =>
    sum + (el.born - people.find(
      mother => el.mother === mother.name
    ).born), 0);
  const avarageDifference = sumOfDifference / children.length;

  return avarageDifference;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
