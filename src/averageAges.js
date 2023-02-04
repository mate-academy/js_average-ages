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
  const manArrCentury = people.filter((person) => {
    if (century !== undefined) {
      return person.sex === 'm' && (Math.ceil(person.died / 100)) === century;
    } else {
      return person.sex === 'm';
    };
  });

  const reducedMan = manArrCentury.reduce(function(person1, person2) {
    return person1 + (person2.died - person2.born);
  }, 0);

  return reducedMan / manArrCentury.length;
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
  const ArrMothers = people.filter((person) => {
    if (withChildren === true) {
      return person.sex === 'f' && people.find(
        (child) => child.mother === person.name);
    } else {
      return person.sex === 'f';
    }
  });

  const reducedMothers
  = ArrMothers.reduce(function(person1, person2) {
    return person1 + (person2.died - person2.born);
  }, 0);

  return (reducedMothers / ArrMothers.length);
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
  const motherSon = people.map(function(child) {
    if (onlyWithSon !== undefined) {
      return [child, people.find(
        (mother) => mother.name === child.mother && child.sex === 'm')];
    } else {
      return [child, people.find(
        (mother) => mother.name === child.mother)];
    }
  });

  const filteredMotherSon = motherSon.filter((person) => {
    return !person.includes(undefined);
  });

  const agesMotherSon = filteredMotherSon.map((person) => {
    return person[0].born - person[1].born;
  });

  return agesMotherSon.reduce((a, b) => a + b, 0) / agesMotherSon.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
