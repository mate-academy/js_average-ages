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
  const persons = century === undefined
    ? people.filter((n) => n.sex === 'm')
    : people.filter((person) => person.sex === 'm'
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
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const mothers = people.map((n) => n.mother);
  const persons = withChildren === undefined
    ? people.filter(n => n.sex === 'f')
    : people.filter(n => mothers.includes(n.name));

  return persons.reduce((s, n) => s + n.died - n.born, 0) / persons.length;
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
  const kids = onlyWithSon
    ? people.filter(kid => people.some(mother => mother.name === kid.mother
      && mother.name !== null)
      && kid.sex === 'm')
    : people.filter(kid => people.some(mother => mother.name === kid.mother
      && mother.name !== null));

  const differences = kids.map(kid => {
    const kidsMother = people.find(mother => mother.name === kid.mother);

    return kid.born - kidsMother.born;
  });

  return (differences.reduce((sum, diference) => sum + diference, 0))
    / differences.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
