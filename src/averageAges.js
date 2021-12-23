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
  const filteredMans = people.filter(person => {
    if (century) {
      return person.sex === 'm' && Math.ceil(person.died / 100) === century;
    }

    return person.sex === 'm';
  });

  const reduceTimeLive = filteredMans.reduce((prev, cur) => {
    return prev + cur.died - cur.born;
  }, 0);

  return reduceTimeLive / filteredMans.length;
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
  let filteredWomens;

  if (withChildren) {
    filteredWomens = people.filter(person => {
      return person.sex === 'f' && people.some((person1) => person1.mother
        === person.name);
    });
  } else {
    filteredWomens = people.filter(person => {
      return person.sex === 'f';
    });
  }

  if (filteredWomens.length === 0) {
    return;
  }

  const reduceTimeLive = filteredWomens.reduce((prev, cur) =>
    prev + cur.died - cur.born, 0);

  return reduceTimeLive / filteredWomens.length;
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
  let children;

  if (onlyWithSon) {
    children = people.filter(person => {
      return people.some(name => name.name
        === person.mother && person.sex === 'm');
    });
  } else {
    children = people.filter(person => {
      return people.some(name => name.name === person.mother);
    });
  }

  const differenceAge = children.map(childs => {
    return childs.born - people.find(mom => mom.name === childs.mother).born;
  });

  const averageSumAge = differenceAge.reduce((sum, age) => sum + age);

  return averageSumAge / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
