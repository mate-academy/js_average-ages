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
  const arr = people.filter(person =>
    century
      ? person.sex === 'm'
      && Math.ceil(person.died / 100) === century
      : person.sex === 'm');

  const ages = arr.map(person => person.died - person.born);

  function getAvarageAge() {
    return ages.reduce((sum, age) => sum + age) / ages.length;
  }

  return getAvarageAge(ages);
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
  const arr = people.filter(person =>
    withChildren
      ? person.sex === 'f'
      && people.find(child =>
        child.mother === person.name)
      : person.sex === 'f');

  const ages = arr.map(person => person.died - person.born);

  function getAvarageAge() {
    return ages.reduce((sum, age) => sum + age) / ages.length;
  }

  return getAvarageAge(ages);
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
  const children = people.filter(child =>
    onlyWithSon
      ? child.sex === 'm'
      && people.some(person =>
        person.name === child.mother)
      : people.some(person =>
        person.name === child.mother)
  );

  const ages = children.reduce((sum, child) => {
    const motherBorn = people.find(person => (
      person.name === child.mother
    )).born;

    const diff = child.born - motherBorn;

    return sum + diff;
  }, 0);

  return ages / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
