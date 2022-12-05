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
  const men = people.filter(person => {
    const isMale = person.sex === 'm';

    return century
      ? isMale && Math.ceil(person.died / 100) === century
      : isMale;
  });
  const menAges = men.map(person => person.died - person.born);
  const averageMenAge = getAverageValue(menAges);

  return averageMenAge;
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
  const women = people.filter(person => (
    withChildren
      ? people.find(child => child.mother === person.name)
      : person.sex === 'f'
  ));

  const womenAges = women.map(person => person.died - person.born);
  const averageWomanAge = getAverageValue(womenAges);

  return averageWomanAge;
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
  const children = people.filter(child => (
    onlyWithSon
      ? people.find(mother => mother.name === child.mother)
      && child.sex === 'm'
      : people.find(mother => mother.name === child.mother)
  ));

  const ageDifferences = children.map(
    child => child.born
    - people.find(mother => mother.name === child.mother).born
  );

  return getAverageValue(ageDifferences);
}

const getAverageValue = (ages) => (
  ages.reduce((sum, age) => sum + age, 0) / ages.length
);

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
