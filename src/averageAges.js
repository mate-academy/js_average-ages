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

  const men = people.filter(person => person.sex === 'm');
  const onlyMen = century
    ? men.filter(man => Math.ceil(man.died / 100) === century)
    : men;

  const sumMenAge = onlyMen.map(man => man.died - man.born)
    .reduce((a, b) => a + b);

  const avarageAge = sumMenAge / onlyMen.length;

  return avarageAge;
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
  const women = people.filter(person =>
    person.sex === 'f');
  const onlyWomen = withChildren
    ? women.filter(woman => people.some(child => child.mother === woman.name))
    : women;

  const sumWomenAge = onlyWomen
    .map(woman => woman.died - woman.born)
    .reduce((a, b) => a + b);
  const avarageAge = sumWomenAge / onlyWomen.length;

  return avarageAge;
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
//

function calculateAverageAgeDiff(people, onlyWithSon) {
  // write code here

  const children = people.filter(person => onlyWithSon
    ? people.some(child => child.name === person.mother) && person.sex === 'm'
    : people.find(child => child.name === person.mother));

  const ageDifferences = children.map(kid =>
    kid.born - people.find(child => child.name === kid.mother).born
  );

  const avarageDifference = ageDifferences.reduce((accumulator, element) =>
    accumulator + element);

  return avarageDifference / ageDifferences.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
