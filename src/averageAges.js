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

function countAverage(numbers) {
  return numbers.reduce((a, b) => a + b, 0) / numbers.length;
}

function getAges(people) {
  return people.map(person => person.died - person.born);
}

function calculateMenAverageAge(people, century) {
  const mans = people.filter(man => {
    return man.sex === 'm'
    && (century === undefined ? true : Math.ceil(man.died / 100) === century);
  });

  const agesMan = getAges(mans);

  return countAverage(agesMan);
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
  const women = people.filter(woman => {
    return woman.sex === 'f'
    && (withChildren === undefined
      ? true
      : people.some(person => person.mother === woman.name));
  });

  const agesWomen = getAges(women);

  return countAverage(agesWomen);
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
  const familyDiff = [];
  const mothers = people.filter(woman => {
    return woman.sex === 'f'
    && people.some(person => person.mother === woman.name);
  });
  const children = people.filter(person => {
    return mothers.some(mother => person.mother === mother.name)
    && (onlyWithSon === undefined
      ? true
      : person.sex === 'm');
  });

  children.forEach(child => {
    const foundMother = mothers.find(mom => mom.name === child.mother);
    const diff = child.born - foundMother.born;

    familyDiff.push(diff);
  });

  return countAverage(familyDiff);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
