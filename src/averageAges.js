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
  const peopleFilter
    = people.filter(person => person.sex === 'm' && filterCentury(person));

  function filterCentury(person) {
    if (century !== undefined) {
      const age = Math.ceil(person.died / 100);

      return age === century;
    }

    return true;
  }

  const reopleAgeArray
    = peopleFilter.map(person => person.died - person.born);

  return reopleAgeArray.reduce((a, b) => a + b)
  / reopleAgeArray.length;
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
  const womanFilter
    = people.filter(person => person.sex === 'f' && filterChildren(person));

  function filterChildren(person) {
    if (withChildren !== undefined) {
      return people.some(element => element.mother === person.name);
    }

    return true;
  }

  const peopleAgeArray
  = womanFilter.map(person => person.died - person.born);

  return peopleAgeArray.reduce((a, b) => a + b)
  / peopleAgeArray.length;
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
  let peopleCyrent = [...people];
  const diferenAga = [];

  if (onlyWithSon !== undefined) {
    peopleCyrent = people.filter(person => person.sex === 'm');
  }

  for (const object of peopleCyrent) {
    const findMom = people.find(mom => mom.name === object.mother);

    if (findMom !== undefined) {
      diferenAga.push(object.born - findMom.born);
    }
  }

  return diferenAga.reduce((a, b) => a + b) / diferenAga.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
