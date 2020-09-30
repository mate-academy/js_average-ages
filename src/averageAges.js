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
  const filteredPeople = (!century)
    ? people.filter(({ sex }) => sex === 'm')
    : people.filter(({ sex, died }) => {
      return Math.ceil(died / 100) === century && sex === 'm';
    });

  return calculateAverageAge(filteredPeople);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const filteredPeople = (!withChildren)
    ? people.filter(({ sex }) => sex === 'f')
    : people.filter(({ name, sex }) => {
      return people.some(child => child.mother === name) && sex === 'f';
    });

  return calculateAverageAge(filteredPeople);
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
  const ageGap = [];

  const female = people.filter(({ sex }) => sex === 'f');

  female.forEach(mother => {
    const children = (!onlyWithSon)
      ? people.filter(child => mother.name === child.mother)
      : people.filter(child => {
        return mother.name === child.mother && child.sex === 'm';
      });

    children.forEach(child => {
      ageGap.push(child.born - mother.born);
    });
  });

  const sumOfAge = ageGap.reduce((previousAge, currentAge) => {
    return previousAge + currentAge;
  });

  return sumOfAge / ageGap.length;
}

const calculateAverageAge = (filteredPeople) => {
  const countOfAges = filteredPeople.reduce((count, { born, died }) => {
    return count + (died - born);
  }, 0);

  return countOfAges / filteredPeople.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
