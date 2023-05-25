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
function calculateAverageAges(ages) {
  const totalAge = ages.reduce((sum, age) => sum + age, 0);

  return totalAge / ages.length;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm'
  && (!century || Math.ceil(person.died / 100) === century));

  const ages = men.map(person => person.died - person.born);

  return calculateAverageAges(ages, men);
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
  const women = people.filter(person => person.sex === 'f'
  && (!withChildren || people.some(child => child.mother === person.name)));

  const totalAge = women.map(woman => woman.died
    - woman.born);

  return calculateAverageAges(totalAge, women);
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
  const children = people.filter(person => (
    people.find(mother => mother.name === person.mother)
    && (onlyWithSon
      ? person.sex === 'm'
      : true)
  ));
  const ageDiffs = children.map(child => {
    const mother = people.find(person => person.name === child.mother);

    return child.born - mother.born;
  });

  return calculateAverageAges(ageDiffs, children);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
