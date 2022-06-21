'use strict';

function getAge(person) {
  return person.died - person.born;
}

function getAverageAge(arrOfAges) {
  return arrOfAges
    .reduce((sum, person) => sum + getAge(person), 0) / arrOfAges.length;
}

function getPeopleBySex(people, sex) {
  return people.filter(person => person.sex === sex);
}

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
  const men = getPeopleBySex(people, 'm');

  const menInCentury = men.filter(
    man => century
      ? Math.ceil(man.died / 100) === century
      : man
  );

  return getAverageAge(menInCentury);
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
  const women = getPeopleBySex(people, 'f');

  const womenWithChildren = women.filter(
    woman => withChildren
      ? people.some(child => child.mother === woman.name)
      : woman
  );

  return getAverageAge(womenWithChildren);
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
  let children = people.filter(
    child => people.some(mom => child.mother === mom.name)
  );

  const boys = getPeopleBySex(children, 'm');

  children = onlyWithSon
    ? boys
    : children;

  const avgAgeDiff = children
    .reduce((sum, child) => sum + (
      child.born - people.find(mom => child.mother === mom.name).born), 0
    ) / children.length;

  return avgAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
