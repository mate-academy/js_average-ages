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
  const menArr = people.filter(person => {
    const isMale = person.sex === 'm';

    return century
      ? Math.ceil(person.died / 100) === century && isMale
      : isMale;
  });

  const avgAge = getAvg(menArr
    .map(man => man.died - man.born));

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
  const womenArr = people.filter(person => {
    const isFemale = person.sex === 'f';

    return withChildren
      ? people.find(child => child.mother === person.name) && isFemale
      : isFemale;
  });

  const womenAvgAge = getAvg(womenArr
    .map(woman => woman.died - woman.born));

  return womenAvgAge;
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
  const childrenArr = people.filter(person => (
    onlyWithSon
      ? people.find(mother => person.mother === mother.name
        && person.sex === 'm')
      : people.find(mother => person.mother === mother.name)
  ));

  const avgDifference = getAvg(childrenArr
    .map(child => (
      child.born - people.find(mother => mother.name === child.mother).born
    )));

  return avgDifference;
}

function getAvg(ages) {
  return ages.reduce((sum, age) => sum + age) / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
