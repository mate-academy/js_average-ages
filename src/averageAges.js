'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 **
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateResult(ageArr) {
  return ageArr.reduce((sum, age) => sum + age, 0) / ageArr.length;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm');

  const ageArr = men.map(x => x.died - x.born);

  return calculateResult(ageArr);
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
  const women = people.filter(wom => withChildren
    ? wom.sex === 'f'
    && people.some(kid => kid.mother === wom.name)
    : wom.sex === 'f');

  const ageArr = women.map(wom => wom.died - wom.born);

  return calculateResult(ageArr);
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
  const personsWhihMother = people.filter(person => onlyWithSon
    ? person.sex === 'm' && people.some(wom => wom.name === person.mother)
    : people.some(wom => wom.name === person.mother));

  const difAge = personsWhihMother.map(person => {
    const mother = people.find(wom => person.mother === wom.name);

    return person.born - mother.born;
  });

  return calculateResult(difAge);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
