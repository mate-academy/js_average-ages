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
const average = (x) => x.reduce((a, b) => a + (b.died - b.born), 0) / x.length;

function calculateMenAverageAge(people, century) {
  const men = people.filter(person =>
    century
      ? Math.ceil(person.died / 100) === century && person.sex === 'm'
      : person.sex === 'm'
  );

  return average(men);
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
  const women = people.filter(person =>
    withChildren
      ? people.some(child => child.mother === person.name)
      : person.sex === 'f'
  );

  return average(women);
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
  const children = people.filter(person => {
    return people.some(women =>
      onlyWithSon
        ? person.sex === 'm' && person.mother === women.name
        : person.mother === women.name
    );
  });

  const diff = children.map(child => {
    const mother = people.find(women => women.name === child.mother);

    return child.born - mother.born;
  });

  return diff.reduce((a, b) => a + b, 0) / diff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
