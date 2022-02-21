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
  const men = people.filter(
    century
      ? (person) => person.sex === 'm'
      && Math.ceil(person.died / 100) === century
      : (person) => person.sex === 'm'
  );

  const menAges = men.reduce((ages, man) =>
    ages + man.died - man.born, 0) / men.length;

  return menAges;
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
  const women = people.filter(person =>
    person.sex === 'f'
  && (!withChildren || people.some(child => child.mother === person.name)));

  const womenAges = women.reduce((ages, man) =>
    ages + man.died - man.born, 0) / women.length;

  return womenAges;
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
  const findMother = (child) => (
    people.find(mother => mother.name === child.mother)
  );

  const filterCallback = onlyWithSon
    ? (child) => findMother(child)
      && child.sex === 'm'
    : findMother;

  const children = people.filter(filterCallback);

  const diferenceAges = children.reduce(
    (ages, child) => (
      ages + child.born - (findMother(child)).born
    ), 0) / children.length;

  return diferenceAges;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
