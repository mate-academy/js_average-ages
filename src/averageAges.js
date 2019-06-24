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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with logical operators (&&, ||)
  // or ternary operator (?:)
  // without nesting
  let mensAgesSum = 0;
  let menNumber = 0;

  if (century) {
    mensAgesSum = people
      .filter(item => item.sex === 'm')
      .filter(item => (Math.ceil(item.died / 100) === century))
      .map(item => item.died - item.born)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

      menNumber = people
        .filter(item => item.sex === 'm')
        .filter(item => (Math.ceil(item.died / 100) === century))
        .length;
  } else {
    mensAgesSum = people
    .filter(item => item.sex === 'm')
    .map(item => item.died - item.born)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

    menNumber = people.filter(item => item.sex === 'm').length;
  }

  const menAverageAges = +(mensAgesSum / menNumber).toFixed(2);

  return menAverageAges;
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
  let womenAgesSum = 0;
  let womenNumber = 0;

  if (withChildren) {
    womenAgesSum = people
      .filter((item, index, arr) => item.sex === 'f'
        && arr.some(elem => elem.mother === item.name))
      .map(item => item.died - item.born)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

    womenNumber = people
      .filter((item, index, arr) => item.sex === 'f'
        && arr.some(elem => elem.mother === item.name)).length;
  } else {
    womenAgesSum = people
      .filter(item => item.sex === 'f')
      .map(item => item.died - item.born)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

    womenNumber = people.filter(item => item.sex === 'f').length;
  }

  const womenAverageAge = +(womenAgesSum / womenNumber).toFixed(2);

  return womenAverageAge;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between mmothers and their
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

  // if (onlyWithSon) {
  //   let mothersNumber = people
  //     .filter((item, index, arr) => item.sex === 'f' &&
  //       arr.some(elem => item.name === elem.mother && item.born < elem.born && elem.sex === 'm')).length;

  //   let mothersBornSum = people
  //     .filter((item, index, arr) => item.sex === 'f' &&
  //       arr.some(elem => item.name === elem.mother && item.born < elem.born  && elem.sex === 'm'))
  //     .map((item, index, arr) =>
  //       item.born)
  //     .reduce((previousValue, currentValue)=> previousValue + currentValue, 0);

  //   let averageMothersBirthYear = mothersBornSum/mothersNumber;

  //   let childrenNumber = people
  //     .filter((item, index, arr) => item.sex === 'm' &&
  //       arr.some(elem => item.mother === elem.name && item.born > elem.born)).length;

  //   let childrenBornSum = people
  //     .filter((item, index, arr) => item.sex === 'm' &&
  //       arr.some(elem => item.mother === elem.name && item.born > elem.born))
  //     .map((item, index, arr) =>
  //       item.born)
  //     .reduce((previousValue, currentValue)=> previousValue + currentValue);

  //   let averageChildrenBirthYear = childrenBornSum/childrenNumber;

  //   let averageChildMotherDifferrence = averageChildrenBirthYear - averageMothersBirthYear;

  //   return averageChildMotherDifferrence;
  // }

    let mothersNumber = people
      .filter((item, index, arr) => item.sex === 'f' &&
        arr.some(elem => item.name === elem.mother)).length;

    let mothersBornSum = people
      .filter((item, index, arr) => item.sex === 'f' &&
        arr.some(elem => item.name === elem.mother))
      .map((item, index, arr) =>
        item.born)
      .reduce((previousValue, currentValue)=> previousValue + currentValue);

    let averageMothersBirthYear = mothersBornSum/mothersNumber;

    let childrenNumber = people
      .filter((item, index, arr) =>
        arr.some(elem => item.mother === elem.name)).length;

    let childrenBornSum = people
      .filter((item, index, arr) =>
        arr.some(elem => item.mother === elem.name))
      .map((item, index, arr) =>
        item.born)
      .reduce((previousValue, currentValue)=> previousValue + currentValue);

    let averageChildrenBirthYear = childrenBornSum/childrenNumber;

    let averageChildMotherDifferrence = averageChildrenBirthYear - averageMothersBirthYear;

   return averageChildMotherDifferrence;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff
};
