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
  let man = people.filter(person => person.sex === 'm');

  man = (century)
    ? man.filter(person => Math.ceil(person.died / 100) === century)
    : man;

  return formatingNum(calcSumAge(man) / man.length);
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
  let woman = people.filter(person => person.sex === 'f');

  woman = (withChildren)
    ? woman.filter(person => {
      return people.find((child) => child.mother === person.name);
    })
    : woman;

  return formatingNum(calcSumAge(woman) / woman.length);
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
  const womanChildBirth = [];
  const womanSonsBirth = [];

  people.filter(kid => people.find(mother => {
    if (kid.mother === mother.name) {
      womanChildBirth.push(kid.born - mother.born);
    }

    return kid.mother === mother.name;
  }));

  people.filter(kid => people.find(mother => {
    if (kid.mother === mother.name && kid.sex === 'm') {
      womanSonsBirth.push(kid.born - mother.born);
    }

    return kid.mother === mother.name;
  }));

  return (onlyWithSon)
    ? calcAverageAgeInArray(womanSonsBirth)
    : calcAverageAgeInArray(womanChildBirth);
}

function calcSumAge(list) {
  return list.reduce((sum, person) => {
    return sum + (person.died - person.born);
  }, 0);
}

function calcAverageAgeInArray(ages) {
  const average = ages.reduce((sum, i) => sum + i) / ages.length;

  return formatingNum(average);
}

function formatingNum(num) {
  return +(num.toFixed(2));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
