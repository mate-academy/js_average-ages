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
  const callback = person => person.sex === 'm';
  const callbackCentury = person => (
    person.sex === 'm') && (Math.ceil(person.died / 100) === century
  );

  const men = century
    ? people.filter(callbackCentury)
    : people.filter(callback);

  const sum = men.reduce((acc, person) => acc + (person.died - person.born), 0);
  const averageAge = sum / men.length;

  return averageAge;
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const callback = person => person.sex === 'f';
  const callbackWithChildren = person => (
    person.sex === 'f' && people.some(child => child.mother === person.name)
  );
  const reducer = (acc, person) => acc + (person.died - person.born);

  const women = withChildren
    ? people.filter(callbackWithChildren)
    : people.filter(callback);

  const sum = women.reduce(reducer, 0);
  const averageAge = sum / women.length;

  return averageAge;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const callback = child => (
    people.some(person => child.mother === person.name)
  );
  const callbackWithSon = child => (
    people.some(person => child.mother === person.name)) && (child.sex === 'm'
  );

  const mothers = people.filter(person =>
    (people.some(child => child.mother === person.name)));

  const children = onlyWithSon
    ? people.filter(callbackWithSon)
    : people.filter(callback);

  const diffList = children.map(child =>
    child.born - mothers.find(person => person.name === child.mother).born);
  const sumDiff = diffList.reduce((acc, value) => acc + value, 0);
  const averageAgeDiff = sumDiff / diffList.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
