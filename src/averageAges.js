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
function calculateMenAverageAge(people, century = 0) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting

  const getMen = (a) => {
    if (century !== 0) {
      return (a.sex === 'm' && Math.ceil(a.died / 100) === century);
    }

    return (a.sex === 'm');
  };

  const menArray = people.filter(getMen);

  if (menArray.length === 0) {
    return 'no such men found';
  }

  const sumOfYears = menArray.reduce((prev, x) => (prev + x.died - x.born), 0);

  const averageAge = sumOfYears / menArray.length;

  return averageAge;
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
function calculateWomenAverageAge(people, withChildren = 0) {
  let getWomen;

  if (withChildren !== 0) {
    getWomen = (a) => a.sex === 'f' && people.some((p) => p.mother === a.name);
  } else {
    getWomen = (a) => a.sex === 'f';
  }

  const women = people.filter(getWomen);

  const totalYears = women.reduce((prev, a) => (prev + a.died - a.born), 0);

  const averageAge = totalYears / women.length;

  return averageAge;
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
function calculateAverageAgeDiff(people, onlyWithSon = 0) {
  let getMothers;

  if (onlyWithSon !== 0) {
    getMothers = (a) =>
      a.sex === 'f' && people.some((p) => p.mother === a.name && p.sex === 'm');
  } else {
    getMothers = (a) =>
      a.sex === 'f' && people.some((p) => p.mother === a.name);
  }

  const mothers = people.filter(getMothers);

  let agesDiferencesSum = 0;
  let n = 0;

  for (const person of people) {
    if (mothers.some((a) => a.name === person.mother)) {
      const mother = mothers.find((a) => a.name === person.mother);

      if (onlyWithSon === 0 || person.sex === 'm') {
        const ageDiff = person.born - mother.born;

        agesDiferencesSum += ageDiff;
        n++;
      }
    }
  }

  return agesDiferencesSum / n;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
