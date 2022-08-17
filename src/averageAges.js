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
  let mans;

  (!century)

    ? mans = people.filter(person => person.sex === 'm')

    : mans = people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century);

  const mansAgeArray = mans.map(man => man.died - man.born);

  return mansAgeArray.reduce((sum, current) =>
    (sum + current)) / mans.length;
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
  let women;

  (!withChildren)

    ? women = people.filter(person => person.sex === 'f')

    : women = people.filter(person => person.sex === 'f'
      && people.some(children => children.mother === person.name));

  const womenAgeArray = women.map(woman => woman.died - woman.born);

  return womenAgeArray.reduce((sum, current) =>
    (sum + current)) / women.length;
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
  let children;
  let women;

  (!onlyWithSon)

    ? children = people.filter(person =>
      people.find(woman =>
        woman.name === person.mother))

    : children = people.filter(person =>
      people.find(woman =>
        woman.name === person.mother) && person.sex === 'm');

  (!onlyWithSon)

    ? women = people.filter(person => people.find(child =>
      child.mother === person.name))

    : women = people.filter(person => people.find(child =>
      child.mother === person.name
      && child.sex === 'm'));

  const agesDiff = children.map(child =>
    (child.born - women.find(woman =>
      child.mother === woman.name).born));

  const averageAgeDiff = agesDiff.reduce((sum, age) =>
    sum + age) / children.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
