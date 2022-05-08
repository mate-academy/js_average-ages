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

const isMale = (person) => person.sex === 'm';
const isFemale = (person) => person.sex === 'f';
const hasMother = (person) => person.mother !== null;
const isMother = (child, mother) =>
  (child.mother === mother.name);

const computeTotalAge = (totalAges, person) =>
  (totalAges + parseFloat(person.died - person.born));

const calculateAverageAge = (ages) =>
  ages.reduce((totalAges, age) => totalAges + age) / ages.length;

let averageAge = 0;

function calculateMenAverageAge(people, century) {
  const males = people.filter(isMale);

  const centuryMales = males.filter((male) =>
    (Math.ceil(male.died / 100) === century));

  arguments.length > 1
    ? averageAge = centuryMales
      .reduce(computeTotalAge, 0) / centuryMales.length

    : averageAge = males
      .reduce(computeTotalAge, 0) / males.length;

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
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(isFemale);
  const children = people.filter(hasMother);
  const mothers = women.filter((mom) =>
    (children.find((child) => isMother(child, mom))));

  arguments.length > 1
    ? averageAge = mothers.reduce(computeTotalAge, 0) / mothers.length
    : averageAge = women.reduce(computeTotalAge, 0) / women.length;

  return averageAge;
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

  averageAge = calculateAverageAge(ages);

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
