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
  let men = [];

  if (century) {
    men = people.filter(person => {
      return person['sex'] === 'm'
        && Math.ceil(person['died'] / 100) === century;
    });
  } else {
    men = people.filter(person => person['sex'] === 'm');
  }

  const avarageMenAge = men.map(person => person['died'] - person['born'])
    .reduce((totalAge, currentAge) => (totalAge + currentAge)) / men.length;

  return avarageMenAge;
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
  let women = [];

  if (withChildren) {
    women = people.filter(person => {
      return people.find(child => child.mother === person.name);
    });
  } else {
    women = people.filter(person => person['sex'] === 'f');
  }

  const avarageWomenAge = women.map(person => person['died'] - person['born'])
    .reduce((totalAge, currentAge) => (totalAge + currentAge)) / women.length;

  return avarageWomenAge;
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
  const AgeOnBirth = [];
  const AgeOnBirthMale = [];
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  people.filter(person => people.find(child => {
    if (child.mother === person.name) {
      AgeOnBirth.push(child.born - person.born);
    }

    if (child.mother === person.name && child.sex === 'm') {
      AgeOnBirthMale.push(child.born - person.born);
    }
  }));

  if (onlyWithSon) {
    return AgeOnBirthMale.reduce(reducer) / AgeOnBirthMale.length;
  }

  return AgeOnBirth.reduce(reducer) / AgeOnBirth.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
