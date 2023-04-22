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
  const men = people.filter(person => person.sex === 'm');
  const centuryCalculation = century ? men.filter(person =>
    Math.ceil(person.died / 100) === century) : men;

  const ageSum = centuryCalculation.reduce((sum, person) => {
    const personAge = person.died - person.born;

    return sum + personAge;
  }, 0);
  const menNumber = centuryCalculation.length;

  return ageSum / menNumber;
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
function calculateWomenAverageAge(people, withChildren = false) {
  let women = people.filter(person =>
    person.sex === 'f');

  women = withChildren
    ? women.filter(woman =>
      people.filter(person =>
        person.mother === woman.name).length > 0)
    : women;

  const ageSum = women.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  return ageSum / women.length;
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const mothers = people.filter(person => person.sex === 'f');
  const children = people.filter(person =>
    mothers.some(mother => mother.name === person.mother));

  const ageDifferences = children.reduce((ageDifferencesArray, child) => {
    const mother = mothers.find(motherOfChild =>
      motherOfChild.name === child.mother);

    if (!onlyWithSon || child.sex === 'm') {
      ageDifferencesArray.push(child.born - mother.born);
    }

    return ageDifferencesArray;
  }, []);

  const ageSum = ageDifferences.reduce((sum, age) => sum + age, 0);
  const ageCount = ageDifferences.length;

  return ageCount > 0 ? ageSum / ageCount : 0;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
