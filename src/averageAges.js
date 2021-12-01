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
  const men = people.filter((person) => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm'
  );

  function findAverage(sum, male) {
    return sum + male.died - male.born;
  }

  const resultAge = +(men.reduce(findAverage, 0) / men.length).toFixed(2);

  return resultAge;
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
  function isMother(person, index) {
    return withChildren ? people.some((child) =>
      child.mother === people[index].name)
      : person.sex === 'f';
  };

  function motherAge(sum, person) {
    return sum + person.died - person.born;
  };

  const women = people.filter(isMother);

  return +(women.reduce(motherAge, 0) / women.length).toFixed(2);
};

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
  function isMother(person, index) {
    return onlyWithSon
      ? people.some((child) =>
        child.mother === people[index].name && child.sex === 'm')
      : people.some((child) => child.mother === people[index].name);
  };

  const mothers = people.filter(isMother);

  function isSon(person) {
    return onlyWithSon
      ? people.some((mother) =>
        mother.name === person.mother && person.sex === 'm')
      : people.some((mother) => mother.name === person.mother && person.sex);
  };

  const sons = people.filter(isSon);

  function findAges(child) {
    const isMom = mothers.find((mom) => {
      return child.mother === mom.name;
    });

    return child.born - isMom.born;
  };

  const ages = sons.map(findAges, 0);

  function findDiff(sum, age) {
    return sum + age;
  }

  const resultDiff = +(ages.reduce(findDiff, 0) / sons.length).toFixed(2);

  return resultDiff;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
