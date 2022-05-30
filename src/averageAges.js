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
  const men = arguments.length > 1 ? people.filter((el) => {
    return century === Math.ceil(el.died / 100);
  }).filter(el => el.sex === 'm') : people.filter(el => el.sex === 'm');

  const ages = men.map((el) => {
    return el.died - el.born;
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
  const women = withChildren ? people.filter((el) => {
    for (const obj of people) {
      if (el.name === obj.mother) {
        return true;
      }
    }

    return false;
  }) : people.filter(el => el.sex === 'f');

  const ages = women.map((el) => {
    return el.died - el.born;
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
      ? people.find((el) => {
        if (el.name === child.mother && child.sex === 'm') {
          return true;
        }

        return false;
      })
      : people.find(el => el.name === child.mother);

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
