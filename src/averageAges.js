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
  const deadMen = century
    ? people.filter((person) => (
      Math.ceil(person.died / 100) === century && person.sex === 'm'
    )).map(man => (
      man.died - man.born
    )) : people
      .filter(person => person.sex === 'm')
      .map(man => man.died - man.born);

  return deadMen.reduce((a, b) => a + b) / deadMen.length;
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
  // write code here
  const womenWithChild = withChildren
    ? people.filter(mother =>
      people.some(child => (
        child.mother === mother.name
      ))) : people
      .filter(women => (women.sex === 'f'));

  return ((womenWithChild
    .map(women => (
      women.died - women.born)))
    .reduce((a, b) => (
      a + b)))
    / womenWithChild.length;
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
// function calculateAverageAgeDiff(people, onlyWithSon) {
//   // write code here
//   const children = onlyWithSon
//     ? people.filter(child => (
//       child.sex === 'm' && child.mother === mother.name
//     )) : people
//       .filter(child => child.mother === mother.name);

//   let result = [];

//   if (children) {
//     result.push(children
//       .map(child => child.born - mother.born));
//   }

//   result = result.flat();

//   return result.reduce((a, b) => a + b) / result.length;
// }

function calculateAverageAgeDiff(people, onlyWithSon) {
  let children = people.filter(
    person => people.find(mother => mother.name === person.mother)
  );

  if (onlyWithSon) {
    children = children.filter(child => child.sex === 'm');
  }

  const difference = children.map(child => child.born - people.find(
    mother => mother.name === child.mother).born
  );

  const avarageDifference = difference.reduce(
    (a, b) => a + b
  ) / difference.length;

  return avarageDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
