'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting

 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function filterSex(array, sex) {
  return array.filter(person => person.sex === sex);
};

function ageAvarage(number, divValue) {
  return Number((number / divValue).toFixed(2));
}

function calculateMenAverageAge(people, century) {
  let menAverageAge = filterSex(people, 'm');

  if (century) {
    menAverageAge = menAverageAge.filter(
      person => Math.ceil(person.died / 100) === century
    );
  }

  const totalAge = menAverageAge.reduce(
    (total, person) => total + (person.died - person.born), 0
  );

  return ageAvarage(totalAge, menAverageAge.length);
};

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find somechild who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  let womanAverageAge = filterSex(people, 'f');

  if (withChildren) {
    womanAverageAge = womanAverageAge.filter(
      person => people.some(child => child.mother === person.name));
  }

  const totalAgeWoman = womanAverageAge.reduce(
    (sum, person) => sum + (person.died - person.born), 0
  );

  return ageAvarage(totalAgeWoman, womanAverageAge.length);
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
  const haveMothers = people
    .filter(person => people.some(child => child.mother === person.name));
  const DiffMotherChild = [];

  haveMothers.forEach(mother => {
    const children = people.filter(child => (onlyWithSon)
      ? child.mother === mother.name && child.sex === 'm'
      : child.mother === mother.name);

    children.forEach(child =>
      DiffMotherChild.push(child.born - mother.born));
  });

  const averageAgeDiff = DiffMotherChild
    .reduce((sum, age) => sum + age, 0) / DiffMotherChild.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
