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
  let allMen = people.filter((person) => person.sex === 'm');

  if (century) {
    allMen = allMen.filter(person => century === Math.ceil(person.died / 100));
  }

  const ageSum = allMen.reduce((sum, person) => {
    return (person.died - person.born + sum);
  }, 0);
  const averageAge = ageSum / allMen.length;

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
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let allWomen = people.filter(person => person.sex === 'f');

  if (withChildren) {
    allWomen = allWomen.filter(person => {
      const isMom = people.some(name => name.mother === person.name);

      return isMom;
    });
  }

  const ageSum = allWomen
    .reduce((sum, person) => person.died - person.born + sum, 0);

  const averageSum = ageSum / allWomen.length;

  return averageSum;
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
  let peopleWithMom = people.filter(person => person.mother);
  let momCount = 0;

  if (onlyWithSon) {
    peopleWithMom = people.filter(person => person.sex === 'm');
  }

  const ageSum = peopleWithMom.reduce((sum, person) => {
    const mom = people.find(momData => momData.name === person.mother);

    if (mom) {
      momCount++;

      return person.born - mom.born + sum;
    }

    return sum;
  }, 0);
  const averageAge = ageSum / momCount;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
