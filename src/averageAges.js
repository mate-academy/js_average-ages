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
  const men = century
    ? people.filter(person => {
      const menCenture = Math.ceil(person.died / 100) === century;

      return menCenture && person.sex === 'm';
    })
    : people.filter(person => person.sex === 'm');

  return getAverege(men);
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
//  * @param {object[]} people
//  * @param {boolean} withChildren - optional
//  *
//  * @return {number}
//  */
function calculateWomenAverageAge(people, withChildren) {
  const women = withChildren
    ? people.filter(person => {
      const childMother = people.some(child => person.name === child.mother);

      return childMother && person.sex === 'f';
    })

    : people.filter(person => person.sex === 'f');

  return getAverege(women);
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
  const different = onlyWithSon
    ? people.filter(child => {
      const mother = people.find(women => women.name === child.mother);

      return mother && child.sex === 'm';
    })

    : people.filter(kids => people.find(mother => mother.name === kids.mother));

  const diffLen = different.length;
  const differenceAge = different
    .reduce((savedValue, iterValue) => savedValue + iterValue.born - people
      .find(mother => (iterValue.mother === mother.name)).born, 0) / diffLen;

  return differenceAge;
}

const getAverege = (arr) => {
  const arrLength = arr.length;
  const sumAge = arr.reduce((savedValue, iterValue) =>
    savedValue + (iterValue.died - iterValue.born), 0);

  return sumAge / arrLength;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
