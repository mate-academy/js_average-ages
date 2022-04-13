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
  const menAge = people
    .filter(x => century
      ? Math.ceil(x.died / 100) === century && x.sex === 'm'
      : (x.sex === 'm')
    );

  const men = menAge
    .map(year => (
      year.died - year.born
    ));

  const averageAge = men
    .reduce((avarage, x) => avarage + x, 0) / men.length;

  return averageAge;
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
  const women = people.filter(person => withChildren
    ? people.some(human => human.mother === person.name)
    : person.sex === 'f');

  const womenAge = women
    .map(year => (
      year.died - year.born
    ));

  const averageAge = womenAge
    .reduce((avarage, x) => avarage + x, 0) / womenAge.length;

  return averageAge;
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
    ? people.filter(person =>
      people.some(mother =>
        mother.name === person.mother && person.sex === 'm'))
    : people.filter(person =>
      people.some(mother =>
        mother.name === person.mother));

  const ages = children.map(person =>
    person.born - people.find(mother => person.mother === mother.name).born);

  const averageAge = ages
    .reduce((average, x) => average + x, 0) / ages.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
