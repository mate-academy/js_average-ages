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
  const men = century ? people.filter((person) => {
    return person.sex === 'm' && century === Math.ceil(person.died / 100);
  }) : people.filter(el => el.sex === 'm');

  const ages = men.map((person) => {
    return person.died - person.born;
  });

  const res = ages.reduce((x, sum) => sum + x, 0);

  return res / ages.length;
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
  const women = withChildren ? people.filter(mother => {
    if (people.find(child => mother.name === child.mother)) {
      return true;
    } else {
      return false;
    }
  })
    : people.filter(person => person.sex === 'f');

  const ages = women.map((person) => {
    return person.died - person.born;
  });

  const res = ages.reduce((x, sum) => sum + x, 0);

  return res / ages.length;
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
  const diffs = [];

  for (const child of people) {
    const mother = onlyWithSon
      ? people.find((person) => {
        return person.name === child.mother && child.sex === 'm';
      })
      : people.find(person => person.name === child.mother);

    if (mother) {
      diffs.push(child.born - mother.born);
    }
  }

  const res = diffs.reduce((x, sum) => sum + x, 0);

  return res / diffs.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
