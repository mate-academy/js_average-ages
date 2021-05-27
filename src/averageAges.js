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

  const men = people.filter((person) => {
    return (century) ? person.sex === 'm'
      && Math.ceil(person.died / 100) === century
      : person.sex === 'm';
  });

  const menAges = men.map((person) => person.died - person.born);
  const menTotalAge = menAges.reduce((sum, age) => sum + age);
  const menAverageAge = menTotalAge / men.length;

  return menAverageAge;

  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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

  const mothers = people.map((person) => person.mother);

  const women = people.filter((person) => {
    return (withChildren) ? mothers.includes(person.name)
      : person.sex === 'f';
  });

  const womenAges = women.map((person) => person.died - person.born);
  const womenTotalAge = womenAges.reduce((sum, age) => sum + age);
  const womenAverageAge = womenTotalAge / women.length;

  return womenAverageAge;
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

  const pairs = people.map((person) => {
    const kid = person;
    const mother = people.find((human) => kid.mother === human.name);
    const pair = [kid, mother];

    return pair;
  });

  const kidsAndMothers = pairs.filter((pair) => {
    return ((onlyWithSon) && (pair[0].sex === 'm' && pair[1]))
      || (!onlyWithSon && pair[1])
      ? pair
      : false;
  });

  const ageDifferences = kidsAndMothers.map((pair) => {
    const kid = pair[0];
    const mother = pair[1];
    const ageDifference = kid.born - mother.born;

    return ageDifference;
  });

  const totalAgeDifferences = ageDifferences.reduce((sum, age) => sum + age);
  const AverageAgeDiff = totalAgeDifferences / ageDifferences.length;

  return AverageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
