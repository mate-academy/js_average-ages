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
  const diedMen = people.filter(person => ((Math.ceil(person.died / 100)
  === century)
   && (person.sex === 'm'))
   || (person.sex === 'm' && !century));

  const sumAge = diedMen.reduce((acc, person) => {
    return acc + (person.died - person.born);
  }, 0);

  return sumAge / diedMen.length;
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
  const womenArr = withChildren
    ? people.filter(person => person.sex === 'f'
      && people.some(child => child.mother === person.name))
    : people.filter(person => person.sex === 'f');

  const sum = womenArr.reduce((acc, person) => {
    return acc + (person.died - person.born);
  }, 0);

  return sum / womenArr.length;
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
  const ageMotherBorn = onlyWithSon
    ? people.filter(person => people
      .some(mother => mother.name === person.mother)
    && person.sex === 'm')
    : people.filter(person => people
      .some(mother => mother.name === person.mother));

  const sum = ageMotherBorn.reduce((acc, person) => {
    const mothers = people.find(mother => mother.name === person.mother);

    return acc + (person.born - mothers.born);
  }, 0);

  return sum / ageMotherBorn.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
