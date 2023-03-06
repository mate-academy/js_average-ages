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

const averageAge = (array) => array
  .reduce((accumulator, value) =>
    accumulator + (value.died - value.born), 0) / array.length;

function calculateMenAverageAge(people, century) {
  const onlyMen = people.filter(person =>
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  );

  return +(averageAge(onlyMen)).toFixed(2);
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
  const onlyWomen = people.filter(person =>
    withChildren
      ? people.some(({ mother }) => mother === person.name)
      : person.sex === 'f'
  );

  return +(averageAge(onlyWomen)).toFixed(2);
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
      ? people.some(parents =>
        parents.name === child.mother && child.sex === 'm')
      : people.some(parents => parents.name === child.mother)
  );

  const mothers = people.filter(parents =>
    onlyWithSon
      ? people.some(child => child.mother === parents.name && child.sex === 'm')
      : people.some(child => child.mother === parents.name)
  );

  const diffOfAge = children.map(child => {
    const mom = mothers.find(({ name }) => name === child.mother);

    return child.born - mom.born;
  });

  const averageDiffOfAge = (diffOfAge.reduce((sum, item) =>
    (sum + item), 0)) / diffOfAge.length;

  return +(averageDiffOfAge).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
