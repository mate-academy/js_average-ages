'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)

 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century = 0) {
  let peopleOfCentury = [];

  if (century) {
    peopleOfCentury = people.filter(el =>
      Math.ceil(el.died / 100) === century && el.sex === 'm');
  } else {
    peopleOfCentury = people.filter(el => el.sex === 'm');
  }

  const average = peopleOfCentury.reduce((acc, el, i, arr) => {
    let result = acc;

    result += el.died - el.born;

    if (i === arr.length - 1) {
      return result / arr.length;
    }

    return result;
  }, 0);

  return +average.toFixed(2);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren = false) {
  let peopleOfCentury = [];

  if (withChildren) {
    const motherArr = people.filter(el =>
      el.mother !== null).map(x => x.mother);

    peopleOfCentury = people.filter(el =>
      el.sex === 'f' && motherArr.includes(el.name));
  } else {
    peopleOfCentury = people.filter(el => el.sex === 'f');
  }

  const average = peopleOfCentury.reduce((acc, el, i, arr) => {
    let result = acc;

    result += el.died - el.born;

    if (i === arr.length - 1) {
      return result / arr.length;
    }

    return result;
  }, 0);

  return +average.toFixed(2);
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

function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const motherArr = people.filter(el => el.mother !== null).map(x => x.mother);
  const mothers = people.filter(el => motherArr.includes(el.name));
  let count = 0;
  let average = 0;

  if (onlyWithSon) {
    const sons = people.filter(el =>
      el.sex === 'm' && motherArr.includes(el.mother));

    average = sons.reduce((acc, el, i, arr) => {
      const ownMother = mothers.filter(item => item.name === el.mother);

      let result = acc;

      if (ownMother.length === 1) {
        result += el.born - ownMother[0].born;
        count++;
      }

      if (i === arr.length - 1) {
        return result / count;
      }

      return result;
    }, 0);
  } else {
    const childs = people.filter(el => motherArr.includes(el.mother));

    average = childs.reduce((acc, el, i, arr) => {
      let result = acc;
      const ownMother = mothers.filter(item => item.name === el.mother);

      if (ownMother.length === 1) {
        result += el.born - ownMother[0].born;
        count++;
      }

      if (i === arr.length - 1) {
        return result / count;
      }

      return result;
    }, 0);
  }

  return +average.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
