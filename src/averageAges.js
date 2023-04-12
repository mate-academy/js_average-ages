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
  const men = people.filter(person => person.sex === 'm');
  let menFromCentury;

  typeof century === 'number'
    ? menFromCentury = (men.filter(person => Math.ceil(person.died / 100)
    === century)) : menFromCentury = men;

  const ages = menFromCentury.map(person => person.died - person.born);
  const sum = ages.reduce((acc, value) => acc + value, 0);

  return sum / ages.length;
};
// write code here
// learn how to use array methods like .filter .map .some .every .find .reduce
// avoid using loop and forEach
// replace `if ()` statement with &&, || or ?:
// without nesting

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
  let womenWithChildren;

  typeof withChildren !== 'undefined'
    ? womenWithChildren = (women.filter(person =>
      people.find(child => child.mother === person.name)))
    : womenWithChildren = women;

  const ages = womenWithChildren.map(person => person.died - person.born);
  const sum = ages.reduce((acc, value) => acc + value, 0);

  return sum / ages.length;
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
  const women = people.filter(person => person.sex === 'f');

  const mothers = women.filter(person =>
    people.find(child => child.mother === person.name));

  const children = people.filter(person =>
    mothers.find(mother => mother.name === person.mother)
  );

  let chosenChildren;

  typeof onlyWithSon !== 'undefined'
    ? chosenChildren = (children.filter(child =>
      child.sex === 'm'))
    : chosenChildren = children;

  const differences = chosenChildren.map(child =>
    child.born - (mothers.find(mother => child.mother === mother.name).born));

  const sum = differences.reduce((acc, value) => acc + value, 0);

  return sum / differences.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
