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

  const menOfCentury = century !== undefined
    ? men.filter(person => Math.ceil(person.died / 100) === century)
    : men;

  const ages = menOfCentury.map(person => person.died - person.born);

  const averageAge = ages.reduce((sum, age) => sum + age, 0) / ages.length;

  return averageAge;
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
  const woman = people.filter(person => person.sex === 'f');

  const womanWithChildren = withChildren !== undefined
    ? woman.filter(person => people.find(human => person.name === human.mother))
    : woman;

  const ages = womanWithChildren.map(person => person.died - person.born);

  const averageAge = ages.reduce((sum, age) => sum + age, 0) / ages.length;

  return averageAge;
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
  const children = people.filter(person =>
    person.mother !== null
    && people.find(mother => mother.name === person.mother));

  const son = onlyWithSon !== undefined
    ? children.filter(person => person.sex === 'm')
    : children;

  const ages = son.map(person => {
    const mothers = people.find(mother => mother.name === person.mother);

    return person.born - mothers.born;
  });

  const averageAge = ages.reduce((sum, age) => sum + age, 0) / ages.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
