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
  const mens = people.filter(person =>
    !century ? person.sex === 'm'
      : person.sex === 'm' && Math.ceil(person.died / 100) === century);

  const sumOfAges = mens.reduce((sum, men) =>
    sum + men.died - men.born, 0);

  return sumOfAges / mens.length;
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
 */
function calculateWomenAverageAge(people, withChildren) {
  const womens = people.filter(person =>
    !withChildren ? person.sex === 'f'
      : person.sex === 'f' && people.some(pers => pers.mother === person.name));

  const sumOfAges = womens.reduce((sum, women) =>
    sum + women.died - women.born, 0);

  return sumOfAges / womens.length;
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
  const womens = [];
  const childs = [];

  for (const person of people) {
    for (const key of people) {
      if (key.mother === person.name) {
        womens.push(person);
        childs.push(key);
      }
    }
  }
  //  const womens = people.filter(person =>
  // people.forEach(person.mother === person.name)));

  // const childs = people.filter(child =>
  //   womens.forEach(women => women.name === child.mother));

  let ageDiff = 0;
  let count = 0;

  for (let i = 0; i < childs.length; i++) {
    if (onlyWithSon) {
      if (childs[i].sex === 'm') {
        ageDiff += (childs[i].born - womens[i].born);
        count++;
      }
    } else {
      ageDiff += (childs[i].born - womens[i].born);
      count++;
    }
  }

  return ageDiff / count;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
