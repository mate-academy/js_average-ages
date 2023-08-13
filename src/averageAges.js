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
  const onlyMen = people
    .filter(person => (person.sex === 'm')
    && (century ? Math.ceil(person.died / 100) === century : person));

  return calculateAge(onlyMen);
}

function calculateAge(people) {
  const ages = people.map((person) => person.died - person.born);

  const totalAge = ages.reduce((sum, age) => sum + age, 0);
  const averageAgeMen = totalAge / ages.length;

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
function calculateWomenAverageAge(people, withChildren) {
  const onlyWomen = people
    .filter(person => (person.sex === 'f')
    && (withChildren ? people.find(
      mother => person.name === mother.mother) : person));

  return calculateAge(onlyWomen);
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
  const children = people
    .filter(person => people.some(mother => mother.name === person.mother)
    && (onlyWithSon ? person.sex === 'm' : person));

  const ageDiff = children
    .map(child => {
      const mother = people
        .find(mom => child.mother === mom.name);

      return child.born - (mother.born || 0);
    });

  const averageAgeDiff = ageDiff.reduce((sum, el) => {
    return sum + el;
  }, 0);

  return averageAgeDiff / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
