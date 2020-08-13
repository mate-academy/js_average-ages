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

  peopleOfCentury = people.filter(el => century
    ? Math.ceil(el.died / 100) === century && el.sex === 'm'
    : el.sex === 'm');

  return +average(peopleOfCentury).toFixed(2);
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
  const motherArr = people.filter(el =>
    el.mother !== null).map(x => x.mother);

  peopleOfCentury = people.filter(el => withChildren
    ? el.sex === 'f' && motherArr.includes(el.name)
    : el.sex === 'f');

  return +average(peopleOfCentury).toFixed(2);
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
  const sons = people.filter(el =>
    el.sex === 'm' && motherArr.includes(el.mother));
  const childs = people.filter(el => motherArr.includes(el.mother));
  let count = 0;

  const averageDiff = function(array) {
    return array.reduce((acc, el, i, arr) => {
      const ownMother = mothers.filter(item => item.name === el.mother);

      let result = acc;

      if (ownMother.length === 1) {
        result += el.born - ownMother[0].born;
        count++;
      }

      return (i === arr.length - 1) ? result / count : result;
    }, 0);
  };

  return onlyWithSon
    ? Number(averageDiff(sons).toFixed(2))
    : Number(averageDiff(childs).toFixed(2));
}

const average = function(peopleOfCentury) {
  return peopleOfCentury.reduce((acc, el, i, arr) => {
    let result = acc;

    result += el.died - el.born;

    return i === arr.length - 1 ? result / arr.length : result;
  }, 0);
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
