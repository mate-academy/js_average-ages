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
  const men = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm'
  );

  const menAge = men.map(person => person.died - person.born);
  const result = menAge.reduce((sum, current) => sum + current, 0)
  / menAge.length;

  return result;
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
  const womenWithChild = people.filter(person =>
    withChildren
      ? person.sex === 'f' && people.some(item => item.mother === person.name)
      : person.sex === 'f'
  );

  const womenAge = womenWithChild.map(person => person.died - person.born);
  const result = womenAge.reduce((sum, current) => sum + current, 0)
  / womenAge.length;

  return result;
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
  const womenWithChild = people.filter(person =>
    onlyWithSon
      ? people.some(human => human.name === person.mother) && person.sex === 'm'
      : people.some(human => human.name === person.mother)
  );
  const diff = womenWithChild.map(person =>
    person.born - people.find(woman => woman.name === person.mother).born
  );

  const result = diff.reduce((sum, current) => sum + current, 0) / diff.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
