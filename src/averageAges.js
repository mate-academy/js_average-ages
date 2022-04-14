'use strict';

const calculateAge = (total, person) => (total + (person.died - person.born));

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
  const onlyMen = people.filter(person => person.sex === 'm'
    && (century ? Math.ceil(person.died / 100) === century : true));

  return onlyMen.reduce((total, person) => (
    calculateAge(total, person)), 0) / onlyMen.length;
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
  const onlyWomen = people.filter(person => (
    withChildren
      ? people.some(children => children.mother === person.name)
      : person.sex === 'f'));

  return onlyWomen.reduce((total, person) => (
    calculateAge(total, person)), 0) / onlyWomen.length;
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
  const onlyWomen = people.filter(women => (
    women.sex === 'f'
  ));

  const onlyChildren = people.filter(children => (
    onlyWomen.some(mother => children.mother === mother.name
      && (onlyWithSon ? children.sex === 'm' : true))));

  return onlyChildren.reduce((total, child) => (
    total + (child.born - onlyWomen.find(women => (
      women.name === child.mother
    )).born)), 0) / onlyChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
