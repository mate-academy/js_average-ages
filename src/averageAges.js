'use strict';

// const people = require('./people');

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

  const men = people.filter(human => human.sex === 'm');

  const menDiedinCentury = men.filter((man) => {
    return Math.ceil(man.died / 100) === century;
  });

  return (century)
    ? menDiedinCentury.reduce((sumAge, man) => {
      return sumAge + (man.died - man.born);
    }, 0) / menDiedinCentury.length

    : men.reduce((sumAge, man) => {
      return sumAge + (man.died - man.born);
    }, 0) / men.length;
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
  // write code here

  const women = people.filter(human => human.sex === 'f');

  const womenWithChilder = women.filter(woman => {
    return people.some(human => human.mother === woman.name);
  });

  return (withChildren)
    ? womenWithChilder.reduce((sumAge, woman) => {
      return sumAge + woman.died - woman.born;
    }, 0) / womenWithChilder.length

    : women.reduce((sumAge, woman) => {
      return sumAge + woman.died - woman.born;
    }, 0) / women.length;
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
  const children = people.filter(human => {
    return people.some(person => person.name === human.mother);
  });

  const sons = children.filter(human => {
    return people.some(person => {
      return person.name === human.mother && human.sex === 'm';
    });
  });

  return (onlyWithSon)
    ? sons.reduce((ageDiffSum, child) => {
      const motherSon = people.find(human => human.name === child.mother);

      return (ageDiffSum + (child.born - motherSon.born));
    }, 0) / sons.length

    : children.reduce((ageDiffSum, child) => {
      const mother = people.find(human => human.name === child.mother);

      return (ageDiffSum + (child.born - mother.born));
    }, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
