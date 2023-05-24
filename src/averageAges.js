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
  const filteredMen = people
    .filter(person => {
      const { sex, died } = person;

      return sex === 'm'
      && (century
        ? Math.ceil(died / 100) === century
        : true);
    })
    .map(person => person.died - person.born);

  return getAverageAge(filteredMen, filteredMen.length);
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
  const filteredWomen = people
    .filter(person => {
      const { sex, name } = person;

      if (withChildren === undefined) {
        return sex === 'f';
      }

      return sex === 'f'
      && (withChildren
        ? people.some(personChild => personChild.mother === name)
        : true);
    })
    .map(person => person.died - person.born);

  return getAverageAge(filteredWomen, filteredWomen.length);
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
  const childrenList = people.filter(child => {
    return people.some(mother => mother.name === child.mother
      && (onlyWithSon
        ? child.sex === 'm'
        : true)
    );
  });

  const ageDifferences = childrenList.map(child => {
    const foundMother = people.find(mother => mother.name === child.mother);

    return child.born - foundMother.born;
  });

  return getAverageAge(ageDifferences, childrenList.length);
}

function getAverageAge(ages, divider) {
  return ages.reduce((sum, age) => (sum + age), 0) / divider || 0;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
