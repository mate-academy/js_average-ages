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
  let avarage;
  let count = 0;

  if (century) {
    avarage = people.reduce((prev, person) => {
      if (Math.ceil(person.died / 100) === century && person.sex === 'm') {
        const age = person.died - person.born;

        count++;

        return age + prev;
      } else {
        return prev;
      }
    }, 0);
  } else {
    avarage = people.reduce((prev, person) => {
      if (person.sex === 'm') {
        const age = person.died - person.born;

        count++;

        return prev + age;
      } else {
        return prev;
      }
    }, 0);
  }

  return avarage / count;
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
  let avarage;
  let womenList = [];

  if (arguments.length > 1) {
    womenList = people.filter(mother => {
      return people.find(child => child.mother === mother.name);
    });

    avarage = womenList.reduce(
      (sumOfAges, woman) => sumOfAges + woman.died - woman.born, 0
    );
  } else {
    womenList = people.filter(women => women.sex === 'f');

    avarage = womenList.reduce(
      (sumOfAges, woman) => sumOfAges + woman.died - woman.born, 0
    );
  }

  return avarage / womenList.length;
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
  let childrenList = [];

  if (arguments.length > 1) {
    childrenList = people.filter(child => child.sex === 'm'
    && people.find(mother => mother.name === child.mother));
  } else {
    childrenList = people.filter(child => people.find(
      mother => mother.name === child.mother));
  }

  const ageDiffList = childrenList.map(child => {
    const motherOfChild = people.find(mother => mother.name === child.mother);

    return child.born - motherOfChild.born;
  });

  const avarage = ageDiffList.reduce((sumOfAges, age) => age + sumOfAges)
    / childrenList.length;

  return avarage;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
