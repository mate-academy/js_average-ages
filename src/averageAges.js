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
function getAverageAge(filteredArr) {
  return filteredArr.reduce((sum, { died, born }) => (
    sum + (died - born)), 0) / filteredArr.length;
};

function calculateMenAverageAge(people, century) {
  const mensArr = people.filter(({ sex, died }) => {
    return sex === 'm'
      && (century ? Math.ceil(died / 100) === century : true);
  });

  return getAverageAge(mensArr);
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
  const isWoman = people.filter(({ sex }) => sex === 'f');
  const mothersNames = people.map(({ mother }) => mother);
  const mothersArr = isWoman.filter(({ name }) => {
    return withChildren ? mothersNames.includes(name)
    === withChildren : isWoman;
  });

  return getAverageAge(mothersArr);
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
  const allChildren = people.filter(({ mother }) =>
    (people.find((mom) => mom.name === mother)));

  const childrenArr = allChildren.filter(({ sex }) => {
    return onlyWithSon ? (sex === 'm') === onlyWithSon : allChildren;
  });

  const diff = childrenArr.reduce((sum, child) =>
    sum + child.born - people.find(mom =>
      (mom.name === child.mother)).born, 0);

  return diff / childrenArr.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
