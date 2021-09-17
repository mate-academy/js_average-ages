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
    let filterConditions = sex === 'm';

    if (century) {
      filterConditions = filterConditions
        && Math.ceil(died / 100) === century;
    }

    return filterConditions;
  });

  return calculateAverageAge(menArr);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
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
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const motherAges = [];

  people
    .filter(({ name, sex }) => {
      const filterConditions = sex === 'f'
        && people.some(human => human.mother === name);

      return filterConditions;
    })
    .forEach(mother => {
      people.forEach(kid => {
        if (onlyWithSon) {
          if (kid.mother === mother.name && kid.sex === 'm') {
            motherAges.push(Math.abs(mother.born - kid.born));
          }
        } else {
          if (kid.mother === mother.name) {
            motherAges.push(Math.abs(mother.born - kid.born));
          }
        }
      });
    });

  return motherAges.reduce((sum, cur, i, arr) => {
    if (i === arr.length - 1) {
      return Number(((sum + cur) / arr.length).toFixed(2));
    }

    return sum + cur;
  }, 0);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
