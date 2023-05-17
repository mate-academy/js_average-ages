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
  const man = people.filter(person => century
    ? person.sex === 'm' && century === Math.ceil(person.died / 100)
    : person.sex === 'm'
  );
  const manAge = man.map(person => person.died - person.born);
  const total = manAge.reduce((sum, current) => sum + current, 0);

  return total / man.length;
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
  const women = people.filter(person => person.sex === 'f');
  const womenFiltered = withChildren
    ? women.filter(woman => people.some(person => person.mother === woman.name))
    : women;
  const womenAge = womenFiltered
    .map(person => person.died - person.born);
  const total = womenAge.reduce((sum, current) => sum + current, 0);

  return total / womenFiltered.length;
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
    ? people
      .filter(person => people
        .some(woman => woman.name === person.mother && person.sex === 'm'))
    : people
      .filter(person => people.some(woman => woman.name === person.mother));
  const totalAgeDifference = children.reduce((accumulator, element) => {
    const mother = people.find(woman => woman.name === element.mother);
    const ageDifference = element.born - mother.born;

    return accumulator + ageDifference;
  }, 0);

  return totalAgeDifference / children.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
