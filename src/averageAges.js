/* eslint-disable no-shadow */
/* eslint-disable no-console */
'use strict';

const people = require('./people');

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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  let age = 0;
  const arrMen = people
    .filter(el => century ? el.sex === 'm'
      && Math.ceil(el.died / 100) === century
      : el.sex === 'm');

  for (const el of arrMen) {
    age += (el.died - el.born);
  }

  const averageAge = age / arrMen.length;

  return averageAge;
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
  let age = 0;
  const arrWomen = people
    .filter(el => withChildren ? el.sex === 'f'
      && people.find(person => person.mother === el.name)
      : el.sex === 'f');

  for (const el of arrWomen) {
    age += (el.died - el.born);
  }

  const averageAge = age / arrWomen.length;

  return averageAge;
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
  let age = 0;
  // console.log('start');

  const arrOfChildren = people
    .filter(el => onlyWithSon ? el.sex === 'm'
      && people.some(person => person.name === el.mother)
      : people.some(person => person.name === el.mother));

  const ages = arrOfChildren.map(child => {
    const mom = people.find(mother => mother.name === child.mother);

    console.log(arrOfChildren);

    return (child.born - mom.born);
  });

  // console.log(ages);

  for (const el of ages) {
    age += el;
  }

  const averageAge = age / ages.length;

  return averageAge;
}

calculateAverageAgeDiff(people);

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
