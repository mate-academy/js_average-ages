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

const findAge = (prev, filteredPerson) => {
  return prev + (filteredPerson.died - filteredPerson.born);
};

function calculateMenAverageAge(people, century) {
  const filterCondition = (person) => {
    if (century) {
      return (person.sex === 'm' && Math.ceil(person.died / 100) === century);
    } else {
      return person.sex === 'm';
    }
  };

  const filteredMen = people.filter(filterCondition);

  const averageAge = filteredMen.reduce(findAge, 0) / filteredMen.length;

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
function calculateWomenAverageAge(people, withChildren) {
  const filterCondition = (person) => {
    if (withChildren) {
      const hasChildren = people.find(peorsonChild => {
        return peorsonChild.mother === person.name;
      });

      return (person.sex === 'f' && hasChildren);
    } else {
      return person.sex === 'f';
    }
  };

  const filteredWomen = people.filter(filterCondition);

  const averageAge = filteredWomen.reduce(findAge, 0) / filteredWomen.length;

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
function calculateAverageAgeDiff(people, onlyWithSon) {
  const filterCondition = (person) => {
    if (onlyWithSon) {
      return people.find(child => {
        return child.name === person.mother;
      }) && person.sex === 'm';
    } else {
      return people.find(child => child.name === person.mother);
    }
  };

  const calcSumAge = (sum, age) => {
    return sum + age;
  };

  const filteredChildren = people.filter(filterCondition);

  const ageDifference = filteredChildren.map(child =>
    child.born - people.find(personChild => {
      return personChild.name === child.mother;
    }).born);

  const averageAge = ageDifference.reduce(calcSumAge, 0) / ageDifference.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
