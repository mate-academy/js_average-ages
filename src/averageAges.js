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
  let men = [...people].filter(human => human.sex === 'm');

  century
    && (men = men.filter(person =>
      Math.ceil(person.died / 100) === century
    ));

  return men.reduce((prev, { born, died }) =>
    prev + died - born, 0
  ) / men.length;
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
  let women = [...people].filter(human => human.sex === 'f');

  withChildren
    && (women = women.filter(woman =>
      people.some(person => person.mother === woman.name)
    ));

  return women.reduce((prev, { born, died }) =>
    prev + died - born, 0
  ) / women.length;
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
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value
  const ages = [];

  people.forEach(mother => {
    people
      .filter(child =>
        child.mother === mother.name && (!onlyWithSon || child.sex === 'm')
      )
      .forEach(child =>
        ages.push(child.born - mother.born)
      );
  });

  return ages.reduce((accumulator, currentValue) =>
    accumulator + currentValue, 0
  ) / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
