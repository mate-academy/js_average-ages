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
  const men = people.filter((person) => {
    return (century)
      ? (century === Math.ceil(person.died / 100) && person.sex === 'm')
      : (person.sex === 'm');
  });

  const sumAgeMen = men.reduce((sumOfAges, person) => {
    const yearsOld = person.died - person.born;

    return sumOfAges + yearsOld;
  }, 0);

  const menAverageAge = sumAgeMen / men.length;

  return +menAverageAge.toFixed(2);
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
  const mothersNames = people.map((person) => (person.mother));

  const woman = people.filter((person) => {
    return (withChildren)
      ? mothersNames.indexOf(person.name) >= 0
      : (person.sex === 'f');
  });

  const sumAgeWoman = woman.reduce((sumOfAges, person) => {
    const yearsOld = person.died - person.born;

    return sumOfAges + yearsOld;
  }, 0);

  const womanAverageAge = sumAgeWoman / woman.length;

  return +womanAverageAge.toFixed(2);
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
  const names = people.map((person) => person.name);

  const children = people.filter((person) => {
    return (onlyWithSon)
      ? (names.includes(person.mother) && person.sex === 'm')
      : (names.includes(person.mother));
  });

  const totalAge = children.reduce((sumOfAges, child) => {
    const motherName = child.mother;

    const mother = people.find((person) => (person.name === motherName));

    const ageDifference = child.born - mother.born;

    return sumOfAges + ageDifference;
  }, 0);

  const averageAgeDiff = totalAge / children.length;

  return +averageAgeDiff.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
