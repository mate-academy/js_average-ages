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
  function calcSexMen(value) {
    return value.sex === 'm';
  }

  function calcCentury(value) {
    return Math.ceil(value.died / 100) === century;
  }

  if (!century) {
    const arrMen = people.filter(calcSexMen);

    const result = arrMen.reduce((sum, x) => sum
      + x.died - x.born, 0);

    return result / arrMen.length;
  }

  if (century) {
    const arrCentury = people.filter(calcCentury);
    const arrMen = arrCentury.filter(calcSexMen);

    const result = arrMen.reduce((sum, x) => sum
      + x.died - x.born, 0);

    return result / arrMen.length;
  }
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
  for (let i = 0; i < people.length; i++) {
    for (let j = 0; j < people.length; j++) {
      if (people[i].name === people[j].mother) {
        people[i].hasChildren = true;
      }
    }
  }

  if (withChildren === undefined) {
    const arrFemale = people.filter((value) => value.sex === 'f');
    const result = arrFemale.reduce((sum, x) => sum
      + x.died - x.born, 0);

    return result / arrFemale.length;
  }

  if (withChildren === true) {
    const arrMother = people.filter((value) => value.hasChildren === true);
    const result = arrMother.reduce((sum, x) => sum
      + x.died - x.born, 0);

    return result / arrMother.length;
  }
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
  if (onlyWithSon === undefined) {
    let result = 0;
    let counter = 0;

    for (let i = 0; i < people.length; i++) {
      for (let j = 0; j < people.length; j++) {
        if (people[i].name === people[j].mother) {
          result += people[j].born - people[i].born;
          counter++;
        }
      }
    }

    return result / counter;
  }

  if (onlyWithSon === true) {
    let resultWithSon = 0;
    let countWithSon = 0;

    for (let i = 0; i < people.length; i++) {
      for (let j = 0; j < people.length; j++) {
        if (people[i].name === people[j].mother && people[j].sex === 'm') {
          resultWithSon += people[j].born - people[i].born;
          countWithSon++;
        }
      }
    }

    return resultWithSon / countWithSon;
  }
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
