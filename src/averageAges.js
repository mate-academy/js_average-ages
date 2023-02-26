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
  const arrayOfMen = people.filter(person => {
    return arguments.length < 2
      ? person.sex === 'm'
      : Math.ceil(person.died / 100) === century && person.sex === 'm';
  });

  const sumOfAges = arrayOfMen.reduce((acc, man) => {
    return acc + (man.died - man.born);
  }, 0);

  const averageAge = sumOfAges / arrayOfMen.length;

  return averageAge;
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
 * Hint: To check if a woman has children you should find someone who
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const arrayOfWomen = people.filter(person => {
    return arguments.length < 2
      ? person.sex === 'f'
      : hasChildren(person) && person.sex === 'f';
  });

  function hasChildren(person) {
    return people.some(element => element.mother === person.name);
  }

  const sumOfAges = arrayOfWomen.reduce((acc, woman) => {
    return acc + (woman.died - woman.born);
  }, 0);

  const averageAge = sumOfAges / arrayOfWomen.length;

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
  const onlyWomen = people.filter(person => {
    return person.sex === 'f';
  });

  const womenWithChildren = onlyWomen.filter(women => {
    return people.some(person => {
      return person.mother === women.name;
    });
  });

  let childrenCount = 0;

  const totalAgeDiff = womenWithChildren.reduce((acc, women) => {
    const ageDiff = ageDiffOfChildren(women);

    return acc + ageDiff;
  }, 0);

  function ageDiffOfChildren(women) {
    const children = people.filter(person => {
      return onlyWithSon
        ? person.mother === women.name && person.sex === 'm'
        : person.mother === women.name;
    });

    const difference = children.reduce((acc, child) => {
      return acc + (child.born - women.born);
    }, 0);

    childrenCount += children.length;

    return difference;
  }

  const averageAgeDiff = totalAgeDiff / childrenCount;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
