'use strict';

function getAvg(numbers) {
  const sumAges = numbers.reduce((sum, each) => sum + each, 0);

  return +(sumAges / numbers.length).toFixed(2);
}
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
  let arrMan = [];
  const arrAges = [];

  if (century !== undefined) {
    arrMan = people
      .filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century);
  } else {
    arrMan = people
      .filter(person => person.sex === 'm');
  }

  arrMan.map(person => arrAges.push(person.died - person.born));

  return getAvg(arrAges);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
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
  let arrWomen = [];

  if (withChildren === true) {
    arrWomen = people.filter(person => person.sex === 'f')
      .filter(woman => getChildren(people, woman).length > 0);
  } else {
    arrWomen = people.filter(person => person.sex === 'f');
  }

  const arrAges = arrWomen.map(person => person.died - person.born);

  return getAvg(arrAges);
}

function getChildren(people, person) {
  return people.filter(child => child.mother === person.name
    || child.father === child.name);
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
  // write code here
  let arrAges = [];

  arrAges = people
    .filter(person => person.sex === 'm' || !onlyWithSon)
    .map(child => [child, getMother(people, child)])
    .filter(([, mother]) => mother)
    .map(([child, mother]) => child.born - mother.born);

  return getAvg(arrAges);
}

function getMother(people, child) {
  return people.find(mother => mother.name === child.mother);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
