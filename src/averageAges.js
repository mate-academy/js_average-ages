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
const ONE_CENTURY = 100;
const MAN = 'm';
const WOMEN = 'f';

function getSumAge(people) {
  return people.reduce((sum, { born, died }) => sum + (died - born), 0);
}

function getCorrectSex(sex, correctSex) {
  return sex === correctSex;
}

function calculateMenAverageAge(people, century) {
  const filteredByMans = people.filter(
    ({ sex, died }) => century
      ? getCorrectSex(sex, MAN) && Math.ceil(died / ONE_CENTURY) === century
      : getCorrectSex(sex, MAN)
  );

  const avgAge = getSumAge(filteredByMans) / filteredByMans.length;

  return avgAge;
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
  const filteredByWomens = people.filter(
    ({ name, sex }) => withChildren
      ? people.find(({ mother }) => mother === name)
      : getCorrectSex(sex, WOMEN)
  );

  const avgAge = getSumAge(filteredByWomens) / filteredByWomens.length;

  return avgAge;
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
  const isMother = child => people.find(mother => child.mother === mother.name);

  const children = people.filter(
    child => onlyWithSon
      ? isMother(child) && getCorrectSex(child.sex, MAN)
      : isMother(child)
  );

  const ageDiff = children.reduce(
    (sum, child) => sum + (child.born - isMother(child).born), 0);

  const avgAge = ageDiff / children.length;

  return avgAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
