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
function calculateAverageAge(people) {
  return people.reduce(
    (acum, { died, born }) => acum + died - born, 0) / people.length;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm'
  && (!century || Math.ceil(person.died / 100) === century));
  const averageAge = calculateAverageAge(men);

  return averageAge;
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
  const filteredWomen = people.filter(({ sex, name }) => sex === 'f'
    && (!withChildren || people.some(({ mother }) => mother === name)));

  const averageAge = calculateAverageAge(filteredWomen);

  return averageAge;
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
  const mothersSet
  = new Set(people.filter(({ sex }) => sex === 'f').map(({ name }) => name));

  const filteredChildren = people.filter(({ mother, sex }) =>
    mothersSet.has(mother) && (!onlyWithSon || sex === 'm')
  );

  const averageMothersAge = filteredChildren.map(child => {
    const foundMother
    = people.find(({ name }) => name === child.mother && mothersSet.has(name));

    return child.born - foundMother.born;
  });

  const result = averageMothersAge.reduce((sum, item) =>
    sum + item, 0) / averageMothersAge.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
