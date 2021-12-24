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
  // let menList = people.filter(person => person.sex === 'm');

  // if (century) {
  //   menList = menList.filter(man => Math.ceil(man.died / 100) === century);
  // }
  let menList;

  if (century) {
    menList = people.filter(person =>
      Math.ceil(person.died / 100) === century && person.sex === 'm');
  } else {
    menList = people.filter(person => person.sex === 'm');
  }

  const totalAge = (menList.reduce((summ, man) => (
    summ + man.died - man.born
  ), 0));

  const averageAge = totalAge / menList.length;

  return averageAge;
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
  // let womenList = people.filter(person => person.sex === 'f');

  // if (withChildren) {
  //   womenList = womenList.filter(women => (
  //     people.some(person => (
  //       person.mother === women.name
  //     ))));
  // }
  let womenList;
  // let womenList = people.filter(person => person.sex === 'f');

  if (withChildren) {
    womenList = people.filter(women => (
      people.some(person => (
        person.mother === women.name
      ))));
  } else {
    womenList = people.filter(person => person.sex === 'f');
  }

  const totalAge = (womenList.reduce((summ, women) => (
    summ + women.died - women.born
  ), 0));

  const averageAge = totalAge / womenList.length;

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
  let childrens = people.filter(person => (
    people.some(mother => person.mother === mother.name)
  ));

  if (onlyWithSon) {
    childrens = childrens.filter(child => child.sex === 'm');
  }

  const totalAge = childrens.reduce((prev, current) => (
    prev + (current.born - people.find(person => (
      current.mother === person.name)).born
    )), 0);
  const averageAgeDiff = totalAge / childrens.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
