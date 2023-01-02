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
  const manFilter = people.filter(item => item.sex === 'm'
  && (century === undefined ? true : Math.ceil(item.died / 100) === century));

  const totalAge = manFilter.reduce((count, man) => {
    const manYears = man.died - man.born;

    return count + manYears;
  }, 0);

  return totalAge / manFilter.length;
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
  const womanFilter = people.filter(item => {
    return item.sex === 'f'
    && (withChildren === undefined
      ? true : people.some(man => man.mother === item.name));
  });

  const totalAge = womanFilter.reduce((count, woman) => {
    const womanYears = woman.died - woman.born;

    return count + womanYears;
  }, 0);

  return totalAge / womanFilter.length;
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
  const mothersList = people.filter(item => {
    return item.sex === 'f'
    && people.some(man => man.mother === item.name);
  });

  const childrenList = people.filter(item => {
    return mothersList.some(mother => item.mother === mother.name)
    && (onlyWithSon === undefined ? true : item.sex === 'm');
  });

  const difference = childrenList.map((child) =>
    child.born - people.find((mother) => mother.name === child.mother).born);

  const age = difference.reduce((a, b) => a + b) / difference.length;

  return age;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
