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

  const men = people.filter(obj => obj.sex === 'm');

  const specifiedCenturyMenDied = men.filter((year) => {
    return Math.ceil(year.died / 100) === century;
  });

  const specifiedMan = century ? specifiedCenturyMenDied : men;

  const menAges = specifiedMan.map((year) => {
    return year.died - year.born;
  });

  const sumOfAges = menAges.reduce((x, y) => x + y, 0);

  const result = Number((sumOfAges / menAges.length).toFixed(2));

  return result;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const woman = people.filter(person => withChildren
    ? (person.sex === 'f' && people.some(child => child.mother === person.name))
    : person.sex === 'f');

  const peopleAges = woman.map(person => person.died - person.born);

  const sumOfAges = peopleAges.reduce((x, y) => x + y, 0);

  const result = Number((sumOfAges / peopleAges.length).toFixed(2));

  return result;
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
  const children = onlyWithSon
    ? people.filter(child => child.sex === 'm' && people.some(person =>
      child.mother === person.name))
    : people.filter(child => people.some(person =>
      person.name === child.mother));

  const childrenMother = people.filter(mother => people.some(person =>
    person.mother === mother.name));

  const peopleAges = children.map(child =>
    child.born - childrenMother.find(mother =>
      mother.name === child.mother).born);

  const getAverage = peopleAges.reduce((x, y) => x + y, 0);

  const result = getAverage / peopleAges.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
