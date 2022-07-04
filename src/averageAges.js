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
  const conditions = person => {
    if (!century) {
      if (person.sex === 'm') {
        return person;
      }
    } else {
      if (person.sex === 'm' && Math.ceil(person.died / 100) === century) {
        return person;
      }
    }
  };

  const agesList = people.filter(conditions).map(person => {
    return person.died - person.born;
  });

  return Math.round(
    agesList.reduce((a, b) => (a + b), 0) / agesList.length * 100
  ) / 100;
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
  const conditions = person => {
    if (withChildren) {
      if (
        people.some(child => child.mother === person.name) && person.sex === 'f'
      ) {
        return person;
      }
    } else {
      if (person.sex === 'f') {
        return person;
      }
    }
  };

  const agesList = people.filter(conditions).map(person => {
    return person.died - person.born;
  });

  return Math.round(
    agesList.reduce((a, b) => (a + b), 0) / agesList.length * 100
  ) / 100;
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
  const conditions = person => {
    if (people.some(mother => person.mother === mother.name)) {
      const motherIndex = people.findIndex(
        mother => person.mother === mother.name
      );

      return onlyWithSon
        ? person.sex === 'm'
          ? person.born - people[motherIndex].born
          : undefined
        : person.born - people[motherIndex].born;
    }
  };

  const agesList = people.map(conditions).filter(el => el !== undefined);

  return Math.round(
    agesList.reduce((a, b) => (a + b), 0) / agesList.length * 100
  ) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
