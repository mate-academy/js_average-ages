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
  const copyOfMen = people.filter(el => el.sex === 'm');

  if (century === 0) {
    return (copyOfMen.reduce((sum, man) => {
      return sum + (man.died - man.born);
    }, 0)) / copyOfMen.length;
  }

  if (century !== 0) {
    const copyOfMenCent = copyOfMen.filter(el => {
      return Math.ceil(el.died / 100) === century;
    });

    return (copyOfMenCent.reduce((sum, man) => {
      return sum + (man.died - man.born);
    }, 0)) / copyOfMenCent.length;
  }
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
function calculateWomenAverageAge(people, withChildren = false) {
  const copyWomen = people.filter(el => el.sex === 'f');

  if (!withChildren) {
    return (copyWomen.reduce((sum, man) => {
      return sum + (man.died - man.born);
    }, 0)) / copyWomen.length;
  }

  const womenWithChildren = people.filter(person => {
    return people.some(child => child.mother === person.name);
  });

  return (womenWithChildren.reduce((sum, man) => {
    return sum + (man.died - man.born);
  }, 0)) / womenWithChildren.length;
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
  const getPeopleWithMother = people.filter(person => {
    return onlyWithSon
      ? person.sex === 'm' && people.some(woman => woman.name === person.mother)
      : people.some(woman => woman.name === person.mother);
  });

  const agesDiff = getPeopleWithMother.map(child => {
    const mother = people.find(woman => woman.name === child.mother);

    return (child.born - mother.born);
  });

  return agesDiff.reduce((sum, man) => sum + man, 0) / agesDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
