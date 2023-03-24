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
  const men = century
    ? people.filter(person =>
      century === Math.ceil(person.died / 100) && person.sex === 'm'
    )
    : people.filter(person => person.sex === 'm');

  const menAge = men.map(man => man.died - man.born);
  const sum = (menAge.reduce((acc, age) =>
    acc + age
  ) / menAge.length).toFixed(2);

  return +sum;
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
    ? people.filter(person =>
      person.mother !== null).map(person => person.mother
    )
    : people.filter(person => person.sex === 'f');

  const mothers = people.filter(person => women.includes(person.name));
  const motherAge = mothers.map(person => person.died - person.born);

  const allAge = women.map(woman => woman.died - woman.born);
  const sum = withChildren
    ? (motherAge.reduce((prev, next) =>
      prev + next) / motherAge.length).toFixed(2)
    : (allAge.reduce((prev, next) => prev + next) / allAge.length).toFixed(2);

  return +sum;
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
  // eslint-disable-next-line max-len
    ? people.filter(person => people.some(mother => mother.name === person.mother) && person.sex === 'm')
  // eslint-disable-next-line max-len
    : people.filter(person => people.some(mother => mother.name === person.mother));

  const average = (mothers.reduce((acc, woman) => {
    const moter = people.find(m => m.name === woman.mother);
    const dif = woman.born - moter.born;

    return acc + dif;
  }, 0) / mothers.length).toFixed(2);

  return +average;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
