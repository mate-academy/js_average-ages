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
  const men = people.filter(person => person.sex === 'm');
  const menDiedInCentury = century
    ? men.filter(man => Math.ceil(man.died / 100) === century)
    : men;

  const menAges = menDiedInCentury.map(man => man.died - man.born);

  const agesSum = menAges.reduce((sum, age) => age + sum, 0);

  return agesSum / menAges.length;
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
  const children = people.filter(person => person.mother !== null);

  const mothersNames = children.map(child => child.mother);
  const mothers = people.filter(person => mothersNames.includes(person.name));

  const women = withChildren
    ? mothers
    : people.filter(person => person.sex === 'f');

  const womenAges = women.map(woman => woman.died - woman.born);
  const agesSum = womenAges.reduce((sum, age) => age + sum, 0);

  return agesSum / womenAges.length;
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
  let children = people.filter(person => person.mother !== null
    && people.find(mother => mother.name === person.mother));

  children = onlyWithSon
    ? children.filter(person => person.sex === 'm')
    : children;

  const mothersNames = children.map(child => child.mother);
  const mothers = people.filter(person => mothersNames.includes(person.name));

  const ageDiffs = children.map(child => child.born - mothers.find(
    mother => child.mother === mother.name).born);

  const averageAgeDiff = ageDiffs.reduce((sum, diff) => (
    sum + diff
  ), 0) / children.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
