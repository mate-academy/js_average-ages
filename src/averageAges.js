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
  const manArr = typeof century !== 'undefined'
    ? people
      .filter((person) => person.sex === 'm')
      .filter((person) => (century === Math.ceil(person.died / 100)))

    : people.filter((person) => person.sex === 'm');

  const sumOfLife = manArr.reduce(
    (start, age) => start + (age.died - age.born), 0);

  return sumOfLife / manArr.length;
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
  const withChild = people.map(person => person.mother);

  const womArr = (withChildren)
    ? people.filter(person => (withChild.includes(person.name)))
    : people.filter(person => person.sex === 'f');

  const sumOfLife = womArr.reduce(
    (start, age) => start + (age.died - age.born), 0);

  return sumOfLife / womArr.length;
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
  const withChild = people.map(person => person.name);

  const childs = (onlyWithSon)
    ? people.filter(
      person => withChild.includes(person.mother) && person.sex === 'm')
    : people.filter(person => withChild.includes(person.mother));

  const calculateAges = childs.reduce((start, person) => {
    const fin = people.find(x => x.name === person.mother);

    return start + (person.born - fin.born);
  }, 0);

  return calculateAges / childs.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
