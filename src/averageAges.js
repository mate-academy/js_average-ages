'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `centrury` is specified then
 * function calculates average age only for men who died in this centrury
 *
 * To calculate centrury:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} centrury - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, centrury) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  let result;

  const mans = people.filter(element => element.sex === 'm');
  const mansYears = mans.map(years => years.died - years.born);
  const sumMansYears = mansYears.reduce((a, b) => a + b, 0);
  const averageYears = +(sumMansYears / mansYears.length).toFixed(2);

  const centr = mans.filter(year => (Math.ceil(year.died / 100)) === centrury);
  const centrYears = centr.map(years => years.died - years.born);
  const centrSum = centrYears.reduce((a, b) => a + b, 0);
  const centrAverageYears = +(centrSum / centrYears.length).toFixed(2);

  centrury === undefined ? result = averageYears : result = centrAverageYears;

  return result;
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
  let finish;

  const womans = people.filter(element => element.sex === 'f');
  const womansYears = womans.map(years => years.died - years.born);
  const sumWomansYears = womansYears.reduce((a, b) => a + b, 0);
  const averageWomans = +(sumWomansYears / womansYears.length).toFixed(2);

  const mams = womans.filter(woman => {
    return people.some(isMama => woman.name === isMama.mother);
  });
  const mamsYears = mams.map(years => years.died - years.born);
  const sumMamsYears = mamsYears.reduce((a, b) => a + b, 0);
  const averageMams = +(sumMamsYears / mamsYears.length).toFixed(2);

  withChildren !== true || withChildren === undefined
    ? finish = averageWomans : finish = averageMams;

  return finish;
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
  let total;

  const withMam = people.filter(name => name.mother !== null);
  const childrens = withMam.filter(child => {
    return people.find(mama => child.mother === mama.name);
  });
  const diffrAge = childrens.map(child => {
    return child.born - people.find(mama => child.mother === mama.name).born;
  });
  const sumAges = diffrAge.reduce((a, b) => a + b, 0);
  const ageAverage = +(sumAges / diffrAge.length).toFixed(2);

  const sons = withMam.filter(son => son.sex === 'm');
  const sonsWithMamList = sons.filter(son => {
    return people.find(woman => son.mother === woman.name);
  });
  const diffrSonAges = sonsWithMamList.map(son => {
    return son.born - people.find(woman => son.mother === woman.name).born;
  });
  const sonsAgeSum = diffrSonAges.reduce((a, b) => a + b, 0);
  const sonsAgeAverage = +(sonsAgeSum / diffrSonAges.length).toFixed(2);

  onlyWithSon !== true || onlyWithSon === undefined
    ? total = ageAverage : total = sonsAgeAverage;

  return total;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
