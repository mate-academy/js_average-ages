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
  const onlyMan = people.filter((i) => i.sex === 'm');
  const normalizeMan = !century ? onlyMan : onlyMan
    .filter((i) => Math.ceil(i.died / 100) === century);
  const sum = normalizeMan.reduce((prev, i) => prev + (i.died - i.born), 0);

  return sum / normalizeMan.length;
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
  const onlyWoman = people.filter((i) => i.sex === 'f');
  const mothers = people.map((i) => i.mother);

  const norlizeWoman = !withChildren ? onlyWoman : onlyWoman
    .filter((i) => mothers.includes(i.name));

  const sum = norlizeWoman.reduce((prev, i) => prev + (i.died - i.born), 0);

  return sum / norlizeWoman.length;
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
  const normalizeChildren = !onlyWithSon ? people
    : people.filter((i) => i.sex === 'm');

  const mothersNames = normalizeChildren.map((i) => i.mother);
  const mothers = people.filter((i) => mothersNames.includes(i.name));

  const objOfMothers = mothers.reduce((prev, i) => {
    return {
      ...prev,
      [i.name]: i.born,
    };
  }, {});

  let sum = 0;
  let countOfUnknown = 0;

  for (let i = 0; i < normalizeChildren.length; i++) {
    const motherName = normalizeChildren[i].mother;

    let difference = normalizeChildren[i].born - objOfMothers[motherName];

    if (isNaN(difference)) {
      countOfUnknown++;
      difference = 0;
    }

    sum += difference;
  }

  return sum / (normalizeChildren.length - countOfUnknown);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
