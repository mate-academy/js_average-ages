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
  let copyPips = [...people];

  copyPips = people.filter((x) => {
    return x.sex === 'm';
  });

  if (century) {
    copyPips = copyPips.filter((x) => {
      return Math.ceil(x.died / 100) === century;
    });
  }

  const ages = copyPips.map((x) => {
    return x.died - x.born;
  });

  let count = 0;

  const avg = ages.reduce((prev, curr) => {
    count++;

    return curr + prev;
  }, 0);

  return (Math.round(avg / count * 100)) / 100;
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
  let copyPips = [...people];

  copyPips = people.filter((x) => {
    return x.sex === 'f';
  });

  if (withChildren) {
    copyPips = copyPips.filter((x) => {
      if (people.some(child => x.name === child.mother)) {
        return true;
      };
    });
  }

  const ages = copyPips.map((x) => {
    return x.died - x.born;
  });

  let count = 0;

  const avg = ages.reduce((prev, curr) => {
    count++;

    return curr + prev;
  }, 0);

  return (Math.round(avg / count * 100)) / 100;
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
  const childPips = people.filter(child => onlyWithSon
    ? people.some(mom => mom.name === child.mother)
    && child.sex === 'm'
    : people.some(mom => mom.name === child.mother));

  const ages = childPips.map(child => {
    const mother = people.find(mom => mom.name === child.mother);

    return child.born - mother.born;
  });

  let count = 0;

  const avg = ages.reduce((prev, curr) => {
    count++;

    return curr + prev;
  }, 0);

  return (Math.round(avg / count * 100)) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
