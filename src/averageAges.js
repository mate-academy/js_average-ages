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
  // write code here
  const isMale = (person) => person.sex === 'm';
  const calculateAge = (person) => person.died - person.born;
  const roundAge = (age) => Math.round(age * 100) / 100;
  const averageAgeCalculate = (ages) =>
    ages.reduce((sum, age) => sum + age, 0) / ages.length;
  const men = people.filter(person => isMale(person));

  const totalManAges = century
    ? men.filter(man => Math.ceil(man.died / 100) === century)
      .map(man => calculateAge(man))
    : men.map(man => calculateAge(man));

  return roundAge(averageAgeCalculate(totalManAges));
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
  // write code here
  const isFemale = (person) => person.sex === 'f';
  const roundAge = (age) => Math.round(age * 100) / 100;
  const calculateAge = (person) => person.died - person.born;
  const averageAgeCalculate = (ages) =>
    ages.reduce((sum, age) => sum + age, 0) / ages.length;

  const women = withChildren
    ? people.filter(person =>
      people.find(child => child.mother === person.name))
      .map(person => calculateAge(person))
    : people.filter(person => isFemale(person))
      .map(person => calculateAge(person));

  return roundAge(averageAgeCalculate(women));
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
  const isMale = (person) => person.sex === 'm';
  const isMother = (mother, child) => mother.name === child.mother;

  const mothers = onlyWithSon
    ? people.filter(person =>
      people.find(child => isMother(person, child) && isMale(child)))
    : people.filter(person =>
      people.find(child => isMother(person, child)));

  const children = onlyWithSon
    ? people.filter(person =>
      people.find(mother => isMother(mother, person) && isMale(person)))
    : people.filter(person =>
      people.find(mother => isMother(mother, person)));

  const totalAgediffrence = children.map(child =>
    child.born - mothers.find(mother => isMother(mother, child)).born);

  const roundAge = (age) => Math.round(age * 100) / 100;
  const averageAgeDifference = (ages) =>
    ages.reduce((sum, age) => sum + age, 0) / ages.length;

  return roundAge(averageAgeDifference(totalAgediffrence));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
