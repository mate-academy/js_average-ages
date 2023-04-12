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
function calculateMenAverageAge(people, century = 0) {
  const selectMen = filterSex(people, 'm');

  const filterMen = century > 0 ? selectMen.filter(person =>
    (Math.ceil(person.died / 100)) === century) : selectMen;

  const arrayOfAges = calcAge(filterMen);

  const agesSum = sumNumbers(arrayOfAges);

  return agesSum / arrayOfAges.length;
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
  const selectWomen = filterSex(people, 'f');

  const womenWithChildren = people.filter(person => {
    return people.some(item => person.name === item.mother);
  });

  const filterWomen = withChildren ? womenWithChildren : selectWomen;

  const arrayOfAge = calcAge(filterWomen);

  const sumAge = sumNumbers(arrayOfAge);

  return sumAge / arrayOfAge.length;
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
  const haveMother = people.filter(
    person => person.mother !== null,
  );

  const getMomsAge = haveMother.map(person => {
    const mother = people.find(mom => mom.name === person.mother);

    return mother !== undefined ? person.born - mother.born : null;
  });

  const getMomsAgeFilt = filterArr(getMomsAge);

  const onlySon = filterSex(haveMother, 'm');

  const getMomsAgeOnlySon = onlySon.map(person => {
    const mother = people.find(mom => mom.name === person.mother);

    return mother !== undefined ? person.born - mother.born : null;
  });

  const gerMomsAgeOnlySonsFilt = filterArr(getMomsAgeOnlySon);

  const ageArray
    = onlyWithSon ? gerMomsAgeOnlySonsFilt : getMomsAgeFilt;

  const ageSum = sumNumbers(ageArray);

  return ageSum / ageArray.length;
}

function filterSex(arr, sex) {
  return arr.filter(person => person.sex === sex);
}

function calcAge(obj) {
  return obj.map(person => person.died - person.born);
}

function sumNumbers(arr) {
  return arr.reduce((accum, age) => accum + age);
}

function filterArr(arr) {
  return arr.filter(obj => obj !== null);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
