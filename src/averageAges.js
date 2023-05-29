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
  let menArray = people.filter(person => person.sex === 'm');

  if (century) {
    menArray = people.filter(person => {
      const personLiveCentury = Math.ceil(person.died / 100);

      return person.sex === 'm' && personLiveCentury === century;
    });
  }

  const totalAge = menArray.reduce((sum, man) => {
    return sum + (man.died - man.born);
  }, 0);

  return totalAge / menArray.length;
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
  let womenArray = people.filter(person => person.sex === 'f');

  if (withChildren) {
    womenArray = people.filter(person => {
      return person.sex === 'f'
      && people.some(child => child.mother === person.name);
    });
  }

  const totalAge = womenArray.reduce((sum, woman) => {
    return sum + (woman.died - woman.born);
  }, 0);

  return totalAge / womenArray.length;
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
  const children = people.filter(child => {
    if (onlyWithSon) {
      return child.sex === 'm'
      && people.some(mother => mother.name === child.mother);
    }

    return people.some(mother => mother.name === child.mother);
  });

  const averageAgeDiff = children.reduce((sum, child) => {
    const mother = people.find(woman => woman.name === child.mother);

    return sum + (child.born - mother.born);
  }, 0) / children.length;

  return Math.round(averageAgeDiff * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
