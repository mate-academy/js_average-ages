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
  const men = people.filter(person => person.sex === 'm');
  const ages = [];
  const agesWithCentury = [];

  const withCentury = men.filter((person) => {
    return Math.ceil(person.died / 100) === century;
  });

  (!century)
    ? men.map(function(person) {
      ages.push(person.died - person.born);
    })
    : withCentury.map(function(person) {
      agesWithCentury.push(person.died - person.born);
    });

  const result = (!century)
    ? (ages.reduce((a, b) => a + b, 0) / ages.length)
    : (agesWithCentury.reduce((a, b) => a + b, 0) / agesWithCentury.length);

  return result;
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
  // write code here
  // filter only women
  const women = people.filter(person => person.sex === 'f');
  // calculate the ages of women
  const ages = [];
  const agesWithChild = [];

  women.map(function(person) {
    ages.push(person.died - person.born);
  });

  // find women with a child
  const womenWithChild = people.filter((a) => {
    for (let i = 0; i < people.length; i++) {
      if (a.sex === 'f' && a.name === people[i].mother) {
        return a;
      }
    }
  });

  // calculate the average age of women with child
  womenWithChild.map(function(person) {
    agesWithChild.push(person.died - person.born);
  });

  const result = (withChildren)
    ? (agesWithChild.reduce((a, b) => a + b, 0) / agesWithChild.length)
    : (ages.reduce((a, b) => a + b, 0) / ages.length);

  return result;
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
  // write code here
  const ageDiff = [];

  people.filter((a) => {
    for (let i = 0; i < people.length; i++) {
      if (a.sex === 'f' && a.name === people[i].mother) {
        ageDiff.push(people[i].born - a.born);
      }
    }
  });

  // diff with sons
  const ageDiffSon = [];

  people.filter((a) => {
    for (let i = 0; i < people.length; i++) {
      if (a.sex === 'f'
          && a.name === people[i].mother
          && people[i].sex === 'm') {
        ageDiffSon.push(people[i].born - a.born);
      }
    }
  });

  const result = (!onlyWithSon)
    ? (ageDiff.reduce((a, b) => a + b, 0) / ageDiff.length)
    : (ageDiffSon.reduce((a, b) => a + b, 0) / ageDiffSon.length);

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
