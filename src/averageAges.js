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
  const mans = people.filter((personDatas) => personDatas.sex === 'm');
  let bornAgeSum = 0;
  let diedAgeSum = 0;
  let count = 0;

  mans.forEach((person) => {
    if (century) {
      if (Math.ceil(person.died / 100) === century) {
        bornAgeSum += person.born;
        diedAgeSum += person.died;
        count++;
      }
    } else {
      bornAgeSum += person.born;
      diedAgeSum += person.died;
      count++;
    }
  });

  return Math.round((diedAgeSum - bornAgeSum) / count * 100) / 100;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter((personDatas) => personDatas.sex === 'f');
  let bornAgeSum = 0;
  let diedAgeSum = 0;
  let count = 0;

  women.forEach((person) => {
    if (withChildren) {
      if (people.some((human) => person.name === human.mother)) {
        bornAgeSum += person.born;
        diedAgeSum += person.died;
        count++;
      };
    } else {
      bornAgeSum += person.born;
      diedAgeSum += person.died;
      count++;
    }
  });

  return Math.round((diedAgeSum - bornAgeSum) / count * 100) / 100;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
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
  const womenWithChild = people.filter((personDatas) => personDatas.sex === 'f'
    && people.some((human) => personDatas.name === human.mother));
  let maternityAgeSum = 0;
  let countForChild = 0;

  womenWithChild.forEach((person) => {
    people.forEach((human) => {
      if (onlyWithSon) {
        if (person.name === human.mother && human.sex === 'm') {
          maternityAgeSum += human.born - person.born;
          countForChild++;
        }
      } else if (person.name === human.mother) {
        maternityAgeSum += human.born - person.born;
        countForChild++;
      }
    });
  });

  return Math.round((maternityAgeSum / countForChild) * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
