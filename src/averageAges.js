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
const avgAge = function(arr) {
  return arr.reduce((accum, item) => {
    return accum + (item.died - item.born);
  }, 0) / arr.length;
};

function calculateMenAverageAge(people, century) {
  const menArray = people.filter(human => human.sex === 'm');
  const menByCentury = menArray
    .filter(human => Math.ceil(human.died / 100) === century);

  return !century ? avgAge(menArray) : avgAge(menByCentury);
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
  const womenArray = people.filter(human => human.sex === 'f');
  const motherArray = people
    .filter(human => people
      .find(person => person.mother === human.name));

  return !withChildren ? avgAge(womenArray) : avgAge(motherArray);
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
  const ageDiff = people.filter(item => onlyWithSon ? item.sex === 'm' : true)
    .map(item => {
      const mom = people.find(mother => mother.name === item.mother);

      return mom ? item.born - mom.born : '';
    })
    .filter(dif => dif);

  const sum = ageDiff.reduce((accum, item) => accum + item, 0);

  return sum / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
