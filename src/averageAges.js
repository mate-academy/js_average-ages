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
function calculateMenAverageAge(people, century = 0) {
  const male = people.filter(person => person.sex === 'm');
  const peopleOfCentury = male.filter(person =>
    Math.ceil(person.died / 100) === century);

  const men = century ? peopleOfCentury : male;

  const age = men.map(date => date.died - date.born);
  const averageAge = roundUpToTwo(age.reduce((sumAge, personAge) =>
    sumAge + personAge, 0) / age.length);

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
function calculateWomenAverageAge(people, withChildren = false) {
  const female = people.filter(person => person.sex === 'f');
  const mothers = female.filter(woman =>
    people.some(person => person.mother === woman.name));

  const women = withChildren ? mothers : female;

  const ageWomen = women.map(date => date.died - date.born);
  const averageAgeWomen = roundUpToTwo(ageWomen.reduce((sumAge, womanAge) =>
    sumAge + womanAge, 0) / women.length);

  return averageAgeWomen;
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
  const personWithMother = onlyWithSon
    ? people.filter(person => person.sex === 'm'
      && people.find(mother => mother.name === person.mother))
    : people.filter(person =>
      people.find(mother => mother.name === person.mother));

  const diffAge = personWithMother.map(child =>
    child.born - (people.find(mother => mother.name === child.mother)).born);

  const averageDiffAge = roundUpToTwo(diffAge.reduce((sumAge, ageNewMothers) =>
    sumAge + ageNewMothers, 0) / diffAge.length);

  return averageDiffAge;
}

function roundUpToTwo(number) {
  return Math.round(100 * number) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
