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
  const menWithCentury = people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century);
  const men = people.filter(person => person.sex === 'm');

  const filteredPeople = century ? menWithCentury : men;

  const ages = filteredPeople.map(person => (person.died - person.born));

  const sumOfAge = ages.reduce((sum, elem) => sum + elem);
  const result = sumOfAge / ages.length;

  return result;
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
  const filteredWomen = people.filter(person => {
    return withChildren
      ? people.some(kid => kid.mother === person.name)
      : person.sex === 'f';
  });

  const ages = filteredWomen.map(person => (person.died - person.born));

  const sumOfAge = ages.reduce((sum, elem) => sum + elem);
  const result = sumOfAge / ages.length;

  return result;
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
  const filteredWomen = people.filter(child => {
    return onlyWithSon
      ? people.some(mom => child.mother === mom.name)
        && child.sex === 'm'
      : people.some(mom => child.mother === mom.name);
  });

  const ages = filteredWomen.map(kid => {
    const mother = people.find(mom => mom.name === kid.mother);

    return (kid.born - mother.born);
  });

  const result = ages.reduce((sum, age) => sum + age) / filteredWomen.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
