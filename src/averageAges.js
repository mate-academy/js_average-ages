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
  let men = people.filter(person => person.sex === 'm');

  if (century) {
    men = men.filter(person => century === Math.ceil(person.died / 100));
  }

  const callback = function(prev, person) {
    const personAge = person.died - person.born;

    return prev + personAge;
  };

  const ages = men.reduce(callback, 0);

  return ages / men.length;
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
  const mothers = withChildren
    ? people.filter(person => ((person.sex === 'f')
      && people.some(child => child.mother === person.name)))
    : people.filter(person => (person.sex === 'f'));

  const callback = function(prev, person) {
    const personAge = person.died - person.born;

    return prev + personAge;
  };

  const ages = mothers.reduce(callback, 0);

  return ages / mothers.length;
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
  let children = people.filter(person => (
    people.some(woman => person.mother === woman.name)
  ));

  if (onlyWithSon) {
    children = people.filter(person => (
      people.some(woman => (person.mother === woman.name)
      && person.sex === 'm')
    ));
  }

  const callback = function(prev, person) {
    const mother = people.find(woman => person.mother === woman.name);
    const diff = person.born - mother.born;

    return prev + diff;
  };

  const ages = children.reduce(callback, 0);

  return ages / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
