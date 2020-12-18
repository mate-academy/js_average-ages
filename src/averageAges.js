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
  let persons;

  century === undefined
    ? persons = people.filter((n) => n.sex === 'm')
    : persons = people.filter((person) => person.sex === 'm'
      && Math.ceil(person.died / 100) === century);

  const sum = persons.reduce((s, n) => s + n.died - n.born, 0);

  return sum / persons.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const mothers = people.map((n) => n.mother);
  let persons;

  withChildren === undefined
    ? persons = (people.filter(n => n.sex === 'f'))
    : persons = people.filter((n) => mothers.includes(n.name));

  const sum = persons.reduce((s, n) => s + n.died - n.born, 0);

  return sum / persons.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothersNamesArray
  = people.map((child) => child.mother);

  const mInfo
  = people.filter(mother => mothersNamesArray.includes(mother.name)
  && mother.name !== null);

  const peopleWithMothersInList
  = people.filter(child => mInfo.find(mother => mother.name === child.mother));

  const validPeopleWithMothersInList
  = peopleWithMothersInList.filter(child => child.mother !== null);

  const fullInfoValidPeopleWithMothersInList
  = validPeopleWithMothersInList.map(child => {
    child.mothersBirthYear
    = mInfo[mInfo.findIndex(mother => mother.name === child.mother)].born;

    return child;
  });

  const fullInfoValidMansWithMothersInList
  = fullInfoValidPeopleWithMothersInList.filter(child => child.sex === 'm');

  let diferences;

  onlyWithSon === undefined
    ? diferences
    = fullInfoValidPeopleWithMothersInList.map(child => child.born
      - child.mothersBirthYear)
    : diferences
    = fullInfoValidMansWithMothersInList.map(child => child.born
      - child.mothersBirthYear);

  const sum = diferences.reduce((s, difference) => s + difference, 0);

  return sum / diferences.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
