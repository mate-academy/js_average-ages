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

  const menArray = people.filter(person => {
    return century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm';
  });

  const agesArray = menArray.map(person => person.died - person.born);

  const sumOfAge = agesArray.reduce((sum, age) => sum + age, 0);

  const averageAge = sumOfAge / agesArray.length;

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
  const womenArray = people.filter(person => {
    return withChildren
      ? people.find(child => child.mother === person.name)
      : person.sex === 'f';
  });

  const agesArray = womenArray.map(person => person.died - person.born);

  const sumOfAge = agesArray.reduce((sum, age) => sum + age, 0);

  const averageAge = sumOfAge / agesArray.length;

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
  // write code here
  const kidsArray = people.filter(person => {
    return onlyWithSon
      ? people.some(mom => mom.name === person.mother) && person.sex === 'm'
      : people.some(mom => mom.name === person.mother);
  });

  const difAges = kidsArray.map(kid => {
    const mom = people.find(el => el.name === kid.mother);

    return (kid.born - mom.born);
  });

  const sumOfAge = difAges.reduce((sum, age) => sum + age, 0);
  const averageAge = sumOfAge / difAges.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
