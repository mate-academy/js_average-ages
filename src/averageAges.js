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

function averageAge(group) {
  const reduced = group.reduce((a, b) => a + (b.died - b.born), 0);

  return reduced / group.length;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(
    human => century
      ? human.sex === 'm' && Math.ceil(human.died / 100) === century
      : human.sex === 'm');

  return averageAge(men);
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
  const mothersList = people.map(person => person.mother);

  const women = people.filter(person => withChildren
    ? person.sex === 'f' && mothersList.includes(person.name)
    : person.sex === 'f'
  );

  return averageAge(women);
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
  const children = people.filter(child => onlyWithSon
    ? child.sex === 'm' && people.find((woman) => child.mother === woman.name)
    : people.find((woman) => child.mother === woman.name)
  );

  const diff = children.map(child => {
    return child.born - people.find(
      (woman) => child.mother === woman.name).born;
  });

  return diff.reduce((a, b) => a + b, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
