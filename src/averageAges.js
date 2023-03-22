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
  const filteredPeople = century ? people.filter(person =>
    century === Math.ceil(person.died / 100) && person.sex === 'm')
    : people.filter(person => person.sex === 'm');

  const ages = filteredPeople.map(person => person.died - person.born);
  const avgAges = ages.reduce((acc, value) => acc + value, 0);

  return avgAges / ages.length;
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
  const women = withChildren
    ? people
      .filter(person => person.mother !== null)
      .map(person => person.mother)
    : people.filter(person => person.sex === 'f');

  const mothers = people.filter(el => women.includes(el.name));
  const averageMothers = mothers.map(el => el.died - el.born);

  const ages = women.map(el => el.died - el.born);
  const averageWomen = withChildren
    ? (averageMothers.reduce((acc, el) => acc + el, 0) / averageMothers.length)
    : (ages.reduce((acc, el) => acc + el, 0) / ages.length);

  return averageWomen;
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
  const findMom = onlyWithSon
    ? people
      .filter(person => people.some(mother => mother.name === person.mother)
       && person.sex === 'm')
    : people
      .filter(person => people.some(mother => mother.name === person.mother));

  const sum = (findMom.reduce((acc, woman) => {
    const mother = people.find(mom => mom.name === woman.mother);
    const difference = woman.born - mother.born;

    return acc + difference;
  }, 0) / findMom.length);

  return sum;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
