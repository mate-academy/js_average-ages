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
    ? people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const menAges = men.map(person => person.died - person.born);

  const average = menAges.reduce((acc, person) =>
    acc + person) / menAges.length;

  return average;
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
  const mother = people.filter(person =>
    person.mother).map(person => person.mother);
  const women = withChildren
    ? people.filter(person =>
      person.sex === 'f' && mother.includes(person.name))
    : people.filter(person => person.sex === 'f');

  const womenAge = women.map(person => person.died - person.born);

  const average = womenAge.reduce((acc, person) =>
    acc + person) / womenAge.length;

  return average;
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
  const child = onlyWithSon
    ? people.filter(person => people.find(
      mother => person.mother === mother.name
    ) && person.sex === 'm')

    : people.filter(person => people.find(
      mother => person.mother === mother.name
    ));

  const difference = child.map(
    ch => ch.born - people.find(mother => ch.mother === mother.name).born
  );

  const averege = difference.reduce((acc, person) =>
    acc + person) / difference.length;

  return averege;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
