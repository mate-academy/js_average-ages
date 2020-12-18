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
  let male;

  !century ? male = people.filter(man => man.sex === 'm')
    : male = people.filter(man => man.sex === 'm'
    && Math.ceil(man.died / 100) === century);

  const menAges = male.map(man => man.died - man.born);

  const avarageAge
    = menAges.reduce((a, b) => a + b) / menAges.length.toFixed(2);

  return avarageAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let female;

  !withChildren ? female = people.filter(woman => woman.sex === 'f')
    : female = people.filter(woman => woman.sex === 'f'
    && people.some(person => person.mother === woman.name));

  const femaleAges = female.map(woman => woman.died - woman.born);

  const femaleAverageAge
    = femaleAges.reduce((a, b) => a + b) / femaleAges.length;

  return femaleAverageAge;
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
  const female = people.filter(woman =>
    woman.sex === 'f'
    && people.some(person => person.mother === woman.name));

  const averageAges = [];
  let children;

  onlyWithSon !== undefined
    ? children = people.filter(person => person.sex === 'm'
      && female.map(woman => person.mother === woman.name))
    : children = people.filter(person =>
      female.map(woman => person.mother === woman.name));

  children.map(child => female.map(woman => child.mother === woman.name
    ? averageAges.push(child.born - woman.born) : child));

  return averageAges.reduce((a, b) => a + b, 0) / averageAges.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
