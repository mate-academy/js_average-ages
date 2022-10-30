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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  if (century) {
    const menFilteredCentury = people.filter(person =>
      person.sex === 'm' && (Math.ceil(person.died / 100) === century));

    const ageMenFilteredCentury = menFilteredCentury.map(person =>
      person.died - person.born);

    return ageMenFilteredCentury.reduce((a, b) =>
      a + b) / menFilteredCentury.length;
  }

  const menFiltered = people.filter(person =>
    person.sex === 'm');

  const ageMenFiltered = menFiltered.map(person =>
    person.died - person.born);

  return ageMenFiltered.reduce((a, b) => a + b) / menFiltered.length;
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
  if (withChildren) {
    const womenFilteredChildren = people.filter(person =>
      person.sex === 'f' && (people.find(item =>
        item.mother === person.name) !== undefined));

    const ageWomenFilteredChildren = womenFilteredChildren.map(person =>
      person.died - person.born);

    return ageWomenFilteredChildren.reduce((a, b) =>
      a + b) / womenFilteredChildren.length;
  }

  const womenFiltered = people.filter(person =>
    person.sex === 'f');

  const ageWomenFiltered = womenFiltered.map(person =>
    person.died - person.born);

  return ageWomenFiltered.reduce((a, b) => a + b) / womenFiltered.length;
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
  if (onlyWithSon) {
    const childrenSons = people.filter(person =>
      person.sex === 'm' && people.find(mother =>
        person.mother === mother.name));

    const ageDifferenceSons = childrenSons.map(child => (
      child.born - people.find(mother => child.mother === mother.name).born)
    );

    return ageDifferenceSons.reduce((a, b) => a + b) / childrenSons.length;
  }

  const children = people.filter(person =>
    people.find(mother => person.mother === mother.name));

  const ageDifference = children.map(child => (
    child.born - people.find(mother => child.mother === mother.name).born)
  );

  return ageDifference.reduce((a, b) => a + b) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
