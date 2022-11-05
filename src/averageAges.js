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
function calculateAverageAge(peopleArray) {
  return peopleArray.reduce((sum, { born, died }, i, arr) => {
    if (i === arr.length - 1) {
      return Number(((sum + (died - born)) / arr.length).toFixed(2));
    }

    return sum + (died - born);
  }, 0);
}

function calculateMenAverageAge(people, century) {
  const menArr = people.filter(({ sex, died }) => {
    const filterConditions = century
      ? sex === 'm' && Math.ceil(died / 100) === century
      : sex === 'm';

    return filterConditions;
  });

  return calculateAverageAge(menArr);
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
  const womenArr = people.filter(({ name, sex }) => {
    const filterConditions = withChildren
      ? sex === 'f' && people.some(human => human.mother === name)
      : sex === 'f';

    return filterConditions;
  });

  return calculateAverageAge(womenArr);
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
  let count = 0;

  return people.reduce((sum, kid, i, arr) => {
    const filterConditions = onlyWithSon
      ? kid.sex === 'm'
      : kid.mother;

    const mom = arr.find(mother => mother.name === kid.mother);

    if (mom && filterConditions) {
      count++;

      if (i === arr.length - 1) {
        return Number((sum + Math.abs(mom.born - kid.born)) / count.toFixed(2));
      }

      return sum + Math.abs(mom.born - kid.born);
    }

    return sum;
  }, 0);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
