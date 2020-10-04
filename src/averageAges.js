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
  let mensCount = 0;
  const averageAgeOfMen = people.reduce((acc, person) => {
    if (person.sex === 'm' && century === undefined) {
      mensCount++;

      return acc + person.died - person.born;
    } else if (person.sex === 'm' && century === Math.ceil(person.died / 100)) {
      mensCount++;

      return acc + person.died - person.born;
    } else {
      return acc;
    }
  }, 0);

  return averageAgeOfMen / mensCount;
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
  const onlyWomen = people.filter(person => person.sex === 'f');

  const womenWithChildren = people.filter(person =>
    people.some(child => child.mother === person.name));

  if (withChildren) {
    const ageWomenWithChildren = womenWithChildren.reduce((acc, person) => {
      return acc + person.died - person.born;
    }, 0);

    return ageWomenWithChildren / womenWithChildren.length;
  } else {
    const ageWomen = onlyWomen.reduce((acc, person) => {
      return acc + person.died - person.born;
    }, 0);

    return ageWomen / onlyWomen.length;
  }
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

  const mother = people.filter(person =>
    people.some(child => child.mother === person.name));

  const children = people.filter(person =>
    mother.some(mom => person.mother === mom.name));

  if (onlyWithSon) {
    const sons = children.filter(person =>
      person.sex === 'm');

    sons.forEach(child => {
      mother.forEach(mom => {
        if (child.mother === mom.name) {
          ageGap.push((child.born - mom.born));
        }
      });
    });
  } else {
    children.forEach(child => {
      mother.forEach(mom => {
        if (child.mother === mom.name) {
          ageGap.push((child.born - mom.born));
        }
      });
    });
  }

  return ageGap.reduce((acc, age) => {
    return (acc + age);
  }, 0) / ageGap.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
