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
  const male = (century === undefined)
    ? people.filter(el => el.sex === 'm')
    : people.filter(el => el.sex === 'm'
    && Math.ceil(el.died / 100) === century
    );

  return male.reduce((acc, el) => acc + (el.died - el.born), 0) / male.length;
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
  const female = people.filter(person => person.sex === 'f');
  const femaleWithChildren = female.filter(person =>
    people.some(child => child.mother === person.name)
  );

  return (withChildren === undefined)
    ? female.reduce((acc, person) =>
      acc + (person.died - person.born), 0) / female.length
    : femaleWithChildren.reduce((acc, person) =>
      acc + (person.died - person.born), 0) / femaleWithChildren.length;
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
  const childrenAll = people.filter(human =>
    people.find(mother => mother.name === human.mother));
  const childrenBoys = childrenAll.filter(human => human.sex === 'm');
  const children = (onlyWithSon) ? childrenBoys : childrenAll;

  return children.reduce((acc, person) =>
    acc + (person.born - people.find(mother =>
      mother.name === person.mother).born), 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
