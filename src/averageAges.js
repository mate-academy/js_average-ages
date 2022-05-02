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

const isMale = person => person.sex === 'm';

const calculateAge = person => person.died - person.born;

const calculateAverageAge = ages =>
  ages.reduce((age1, age2) => age1 + age2) / ages.length;

const isMother = (child, mother) => child.mother === mother.name;

const roundAges = age => Math.round(age * 100) / 100;

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => isMale(person));

  const menAges = century
    ? men.filter(person => Math.ceil(person.died / 100) === century)
      .map(person => calculateAge(person))
    : men.map(person => calculateAge(person));

  const averageAges = calculateAverageAge(menAges);

  return roundAges(averageAges);
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
  const filteredWomen = withChildren
    ? people.filter(person => people.find(child => isMother(child, person)))
    : people.filter(person => person.sex === 'f');

  const ages = filteredWomen.map(person => calculateAge(person));

  const averageAges = calculateAverageAge(ages);

  return roundAges(averageAges);
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
  const mothers = onlyWithSon
    ? people.filter(person =>
      people.find(child => isMother(child, person) && isMale(child)))
    : people.filter(person =>
      people.find(child => isMother(child, person)));

  const children = onlyWithSon
    ? people.filter(person =>
      people.find(mother => isMother(person, mother) && isMale(person)))
    : people.filter(person =>
      people.find(mother => isMother(person, mother)));

  const ages = children.map(child =>
    child.born - mothers.find(mother => isMother(child, mother)).born);

  const averageAges = calculateAverageAge(ages);

  return roundAges(averageAges);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
