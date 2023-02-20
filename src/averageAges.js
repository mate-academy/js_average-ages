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
  const mens = people.filter(person => person.sex === 'm');

  const ages = century
    ? [...mens]
      .filter(men => Math.ceil(men.died / 100) === century)
      .map(men => men.died - men.born)
    : [...mens].map(men => men.died - men.born);

  return ages.reduce((accum, current) => accum + current, 0) / ages.length;
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  const womens = people.filter(person => person.sex === 'f');
  const peopleMothers = people.map(person => person.mother);
  const ages = withChildren
    ? [...womens]
      .filter(women => peopleMothers.includes(women.name))
      .map(women => women.died - women.born)
    : [...womens].map(women => women.died - women.born);

  return ages.reduce((accum, current) => accum + current, 0) / ages.length;
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
  const children = onlyWithSon
    ? people.filter(person => person.sex === 'm' && people.some(woman =>
      woman.name === person.mother))
    : people
      .filter(person => people.some(woman => woman.name === person.mother));

  const averageDiff = children.reduce((sum, person) => {
    const mother = people.find(woman => woman.name === person.mother);

    return sum + (person.born - mother.born);
  }, 0) / children.length;

  return averageDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
