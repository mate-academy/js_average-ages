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
  const arrMan = people.filter(item => item.sex === 'm');
  const resultManAll = arrMan.reduce((accumulation, item) => {
    return accumulation + (item.died - item.born);
  }, 0) / arrMan.length;

  const centuryDied = arrMan.filter(
    man => Math.ceil(man.died / 100) === century);
  const diedThisCentury = centuryDied.reduce(
    (sum, man) => {
      return sum + (man.died - man.born);
    }, 0) / centuryDied.length;

  return century === undefined ? resultManAll : diedThisCentury;
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
  const allWomen = people.filter(item => item.sex === 'f');

  const womenRes1 = +(allWomen.reduce(
    (cumulate, women) => {
      return cumulate + (women.died - women.born);
    }, 0) / allWomen.length).toFixed(2);

  const womenWithChildren = people.filter(
    person => person.sex === 'f' && people.some(
      child => child.mother === person.name));

  const womenRes2 = +(womenWithChildren.reduce(
    (cumulate, women) => {
      return cumulate + (women.died - women.born);
    }, 0) / womenWithChildren.length).toFixed(2);

  return withChildren === undefined ? womenRes1 : womenRes2;
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
  const allChild = people.filter(person => people.find(
    mother => mother.name === person.mother));
  const motherSon = people.filter(person => people.find(
    mother => mother.name === person.mother && person.sex === 'm'));

  const result = allChild.reduce((sum, child) => {
    const mother = people.find(mother1 => child.mother === mother1.name);

    return sum + (child.born - mother.born);
  }, 0) / allChild.length;

  const result2 = motherSon.reduce((sum, child) => {
    const mother = people.find(mother2 => child.mother === mother2.name);

    return sum + (child.born - mother.born);
  }, 0) / motherSon.length;

  return onlyWithSon === undefined ? result : result2;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
