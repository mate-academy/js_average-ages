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

const getPeopleBySex = (people, sex) =>
  people.filter(person => person.sex === sex);

function calculateMenAverageAge(people, century) {
  const men = getPeopleBySex(people, 'm');

  const menThatCentury = men.filter(person => century
    ? Math.ceil(person.died / 100) === century
    : men
  );

  const averageMenAge = menThatCentury.reduce((sum, age) =>
    sum + (age.died - age.born), 0) / menThatCentury.length;

  return averageMenAge;
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
  const women = getPeopleBySex(people, 'f');

  const womenWithChild = women.filter(person => withChildren
    ? people.some(child => child.mother === person.name)
    : women
  );

  const averageWomenAge = womenWithChild.reduce((sum, age) =>
    sum + (age.died - age.born), 0) / womenWithChild.length;

  return averageWomenAge;
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
  let children = people.filter(child => (
    people.some(mother => child.mother === mother.name)
  ));

  const women = getPeopleBySex(people, 'f');

  const mothersWithChildren = women.filter(woman => (
    people.some(child => child.mother === woman.name)
  ));

  const son = getPeopleBySex(children, 'm');

  if (onlyWithSon) {
    children = son;
  }

  const averageAgeDiff = children.map(child => (
    child.born - mothersWithChildren.find(woman =>
      woman.name === child.mother).born
  ));

  return averageAgeDiff.reduce((sum, difference) => (
    sum + difference
  ), 0) / averageAgeDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
