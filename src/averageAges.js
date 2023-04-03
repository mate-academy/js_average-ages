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
  const onlyMen = people.filter(person => person.sex === 'm');

  const menOfCentury = onlyMen.filter(person =>
    Math.ceil(person.died / 100) === century);

  const men = century ? menOfCentury : onlyMen;

  const age = men.map(date => date.died - date.born);
  const averageAgeMen = getAverage(age);

  return averageAgeMen;
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
  const Onlywomen = people.filter(person => person.sex === 'f');
  const mothers = Onlywomen.filter(woman =>
    people.some(person => person.mother === woman.name));

  const women = withChildren ? mothers : Onlywomen;

  const ageWomen = women.map(date => date.died - date.born);
  const averageAgeWomen = getAverage(ageWomen);

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

  const averageDiffAge = getAverage(diffAge);

  return averageDiffAge;
}

function getAverage(agePeople) {
  return Math.round(agePeople.reduce((sumAge, agePerson) =>
    sumAge + agePerson, 0) * 100 / agePeople.length) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
