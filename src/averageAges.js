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
  const ageOfMen = [];

  people.filter(({ born, died, sex }) => {
    const diedCentury = Math.ceil(died / 100);
    const age = died - born;
    const centuryCheck = century ? century === diedCentury : true;

    if (centuryCheck && sex === 'm') {
      ageOfMen.push(age);
    }
  });

  const sumOfAges = ageOfMen.reduce((acc, age) => acc + age);

  return Math.round((sumOfAges / ageOfMen.length) * 100) / 100;
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
  const ageOfWomen = [];

  people.filter(({ born, died, sex, name }) => {
    const age = died - born;
    const hasChildren = people.some(person => person.mother === name);
    const withChildrenCheck = withChildren
      ? withChildren === hasChildren
      : true;

    if (withChildrenCheck && sex === 'f') {
      ageOfWomen.push(age);
    }
  });

  const sumOfAges = ageOfWomen.reduce((acc, age) => acc + age);

  return Math.round((sumOfAges / ageOfWomen.length) * 100) / 100;
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
  const ageDifference = [];

  people.filter(({ born, name }) => {
    const children = people.filter(({ mother }) => mother === name);
    const childrenBirthYears = children.map(child => child.born);
    const sons = children.filter(child => child.sex === 'm');

    if (onlyWithSon && sons.length > 0) {
      sons.forEach(son => ageDifference.push(son.born - born));
    }

    if (!onlyWithSon && children) {
      childrenBirthYears.forEach(birth => ageDifference.push(birth - born));
    }
  });

  const sumOfAges = ageDifference.reduce((acc, age) => acc + age);

  return Math.round((sumOfAges / ageDifference.length) * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
