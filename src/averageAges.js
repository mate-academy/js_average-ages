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
  const men = people.filter((person) => {
    const isCentury = Math.ceil(person.died / 100) === century;
    const isMan = person.sex === 'm';

    if (century) {
      return isMan && isCentury;
    }

    return isMan;
  });

  return calculateAverageAge(men);
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
  const women = people.filter((person) => {
    const isFemale = person.sex === 'f';
    const isMother = people.some((child) => child.mother === person.name);

    if (withChildren) {
      return isFemale && isMother;
    }

    return isFemale;
  });

  return calculateAverageAge(women);
}

function calculateAverageAge(people) {
  if (!people.length) {
    return 0;
  }

  const sum = people.reduce((acc, person) => {
    return acc + (person.died - person.born);
  }, 0);

  return Math.round((sum / people.length) * 100) / 100;
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const children = people.filter((child) => {
    const hasMother = people.some((woman) => woman.name === child.mother);
    const isSon = child.sex === 'm';

    if (onlyWithSon) {
      return hasMother & isSon;
    }

    return hasMother;
  });

  if (!children.length) {
    return 'No children found';
  }

  const ageDiff = children.reduce((acc, child) => {
    const mother = people.find((woman) => woman.name === child.mother);

    return acc + (child.born - mother.born);
  }, 0);

  return Math.round((ageDiff / children.length) * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
