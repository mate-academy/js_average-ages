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
  let men = people.filter(person => person.sex === 'm');

  if (century) {
    men = men.filter(person => Math.ceil(person.died / 100) === century);
  }

  const totalAge = men.reduce((sum, person) =>
    sum + (person.died - person.born), 0);
  const averageAge = totalAge / men.length;

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
  const women = people.filter(person => person.sex === 'f');

  if (withChildren) {
    const womenWithChildren = women.filter((woman) =>
      people.some(person => person.mother === woman.name));

    const totalAgeWithChildren = womenWithChildren.reduce((sum, person) =>
      sum + (person.died - person.born), 0);

    const averageAgeWithChildren
    = totalAgeWithChildren / womenWithChildren.length;

    return averageAgeWithChildren;
  }

  const totalAge = women.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  const averageAge = totalAge / women.length;

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
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value
  let peopleWithMothers = people.filter(person =>
    people.some(i => i.name === person.mother));

  if (onlyWithSon) {
    peopleWithMothers = peopleWithMothers.filter(person =>
      person.sex === 'm' && peopleWithMothers);
  };

  const ageDifferences = peopleWithMothers.map((child) => {
    const mother = people.find((person) => person.name === child.mother);

    return child.born - mother.born;
  });

  const totalAgeDiffrence = ageDifferences.reduce(
    (sum, diffrence) => sum + diffrence, 0);

  const averagediff = totalAgeDiffrence / ageDifferences.length;

  return averagediff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
