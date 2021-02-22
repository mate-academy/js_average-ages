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
const reducedAverage = (value) => {
  return value.reduce((acc, currennt) => {
    return acc + currennt;
  }, 0) / value.length;
};

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm');

  const allMen = men.map(element => element.died - element.born);

  const menWithCentury = men.filter(x => Math.ceil(x.died / 100) === century)
    .map((element) => element.died - element.born);

  return arguments.length === 2
    ? reducedAverage(menWithCentury)
    : reducedAverage(allMen);
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
  const weman = people.filter((x) => x.sex === 'f');

  const womentWithotChildren = weman.filter(mam =>
    people.some((x) => mam.name !== x.mother))
    .map(x => x.died - x.born);

  const womanWithChildren = weman.filter(mam =>
    people.some((x) => mam.name === x.mother))
    .map(x => x.died - x.born);

  return arguments.length === 2
    ? reducedAverage(womanWithChildren)
    : reducedAverage(womentWithotChildren);
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
  const mothers = (people.filter(mam =>
    people.some(child => child.mother === mam.name)));

  const children = (people.filter(x =>
    people.some(mother => mother.name === x.mother)));

  const childrenBoys = (people.filter(x => people.some(mother =>
    (mother.name === x.mother) && x.sex === 'm')));

  const AllChildren = mothers.reduce((accumulator, currennt) => {
    let perviousValue = accumulator;

    children.forEach(element => {
      if (element.mother === currennt.name) {
        perviousValue += element.born - currennt.born;
      }
    });

    return perviousValue;
  }, 0);

  const WithSon = mothers.reduce((accumulator, currennt) => {
    let perviousValue = accumulator;

    childrenBoys.forEach(element => {
      if (element.mother === currennt.name && element.sex === 'm') {
        perviousValue += element.born - currennt.born;
      }
    });

    return perviousValue;
  }, 0);

  return arguments.length === 2
    ? WithSon / childrenBoys.length
    : AllChildren / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
