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

  const menArr = people.filter((person) => {
    const genderCheck = person.sex === 'm';
    const centuryCheck = Math.ceil(person.died / 100) === century;

    return century ? genderCheck && centuryCheck : genderCheck;
  });

  const menAgeTotal = menArr.reduce(getAgeSum, 0);

  return menAgeTotal / menArr.length;
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
  const women = people
    .filter((person) => person.sex === 'f');

  const motherArr = women.filter((woman) => {
    const mentionAsMother = people
      .some((person) => person.mother === woman.name);

    return mentionAsMother;
  });

  const resultArr = withChildren ? motherArr : women;

  const womenTotalAge = resultArr.reduce(getAgeSum ,0);

  return womenTotalAge / resultArr.length;
}

function getAgeSum (sum, age) {
  return sum + (age.died - age.born);
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
  const children = people.filter((child) => {
    const hasMother = people.some((person) => person.name === child.mother);
    const isSon = child.sex === 'm';

    return onlyWithSon ? hasMother && isSon : hasMother;
  });

  const totalAgeDiff = children.reduce((total, child) => {
    const mother = people.find((p) => p.name === child.mother);
    const ageDiff = child.born - mother.born;

    return total + ageDiff;
  }, 0);

  return totalAgeDiff / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
