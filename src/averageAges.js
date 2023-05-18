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
  const men = people
    .filter(person => (century)
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm');

  const menAges = men.map(man => man.died - man.born);

  return averageAge(menAges);

  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
 *
 */

function calculateWomenAverageAge(people, withChildren) {
  const women = people
    .filter(person => (withChildren)
      ? person.sex === 'f' && people.some(human => human.mother === person.name)
      : person.sex === 'f');

  const womenAges = women.map(woman => woman.died - woman.born);

  return averageAge(womenAges);
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
  const mothers = people.filter(person => person.sex === 'f')
    .filter(mother =>
      people.some(person => person.mother === mother.name));

  const children = people
    .filter(person => (onlyWithSon)
      ? mothers.some(mother => person.mother === mother.name)
        && person.sex === 'm'
      : mothers.some(mother => person.mother === mother.name));

  const diffAges = children.map(child =>
    child.born - mothers.find(mother => mother.name === child.mother).born);

  return averageAge(diffAges);
}

function averageAge(arrayOfAge) {
  const countAge = arrayOfAge.length;

  return (arrayOfAge.reduce((sumOfAge, age) => sumOfAge + age)) / countAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
