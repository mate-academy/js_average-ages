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
  const checkCentury = century
    ? people.filter(item => item.sex === 'm'
    && Math.ceil(item.died / 100) === century)
    : people.filter(item => item.sex === 'm');

  const ageArr = checkCentury.map(item => item.died - item.born);
  const agesAverage = ageArr.reduce((a, b) => a + b, 0) / ageArr.length;

  return agesAverage;
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
    people.some(child => (
      withChildren
        ? person.sex === 'f' && child.mother === person.name
        : person.sex === 'f'
    ))));

  const ageArr = women.map(item => item.died - item.born);
  const agesAverage = ageArr.reduce((a, b) => a + b, 0) / ageArr.length;

  return agesAverage;
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
  const agedifference = onlyWithSon
    ? people.filter(person => (
      people.find(women => person.mother === women.name)
      && person.sex === 'm'))
    : people.filter(person => (
      people.find(women => person.mother === women.name)));

  const ageArr = agedifference.map(person => {
    const mother = people.find(mom => mom.name === person.mother);
    const diff = person.born - mother.born;

    return diff;
  });

  const agesAverage = ageArr.reduce((a, b) => a + b, 0) / ageArr.length;

  return agesAverage;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
