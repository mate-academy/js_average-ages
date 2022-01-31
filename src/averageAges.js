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
  const allMens = century
    ? people.filter(person => century === Math.ceil(person.died / 100)
      && person.sex === 'm')
    : people.filter(person => person.sex === 'm');

  // creating array with ages
  const ages = [];

  // pushing age of all mens
  allMens.forEach(men => ages.push(men.died - men.born));

  // sum man's ages
  const sumOfAges = ages.reduce((agesSum, curent) => agesSum + curent, 0);

  return sumOfAges / ages.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
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
  const ages = withChildren
    ? people.filter((person) =>
      people
        .map(mom => mom.mother)
        .includes(person.name))
      .map(person => person.died - person.born)
    : people
      .filter(person => person.sex === 'f')
      .map(mom => mom.died - mom.born);

  return ages.reduce((ageSum, current) => ageSum + current, 0) / ages.length;
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
  const childrens = onlyWithSon
    ? people
      .filter((person) => person.sex === 'm'
        && people.some((mom) => mom.name === person.mother))
    : people
      .filter((person) => people.some((mom) => mom.name === person.mother));

  const mothers = people.filter((mother) =>
    childrens.find((child) => mother.name === child.mother)
  );

  const childAgesSum = childrens
    .map((child) => child.born)
    .reduce((age, currentAge) => age + currentAge, 0);

  const mothersAge = childrens.map((child) =>
    mothers
      .filter((mom) => mom.name === child.mother)
      .map((age) => age.born)
      .reduce((age, curent) => age + curent)
  );

  return ((childAgesSum
    - mothersAge.reduce((age, cur) => age + cur)) / childrens.length);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
