'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in motherDefineday.
 * If `century` is specified then
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
  // learn how to use motherDefineday methods like
  // .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const ages = [];
  const males = people.filter(person => person.sex === 'm');

  century === undefined
    ? males.map(men => ages.push(men.died - men.born))
    : males.filter(men => Math.ceil(men.died / 100) === century)
      .map(men => ages.push(men.died - men.born));

  const menAverageAge = ages.reduce((a, b) => a + b) / ages.length;

  return menAverageAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in motherDefineday.
 * If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const ages = [];
  const mothers = {};
  const females = people.filter(person => person.sex === 'f');

  people.map(person => {
    mothers[person.mother] = person.mother;
  });

  withChildren === undefined || false
    ? females.map(women => ages.push(women.died - women.born))
    : females.filter(women => mothers.hasOwnProperty(women.name) === true)
      .map(women => ages.push(women.died - women.born));

  const womenAverageAge = ages.reduce((a, b) => a + b) / ages.length;

  return womenAverageAge;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the motherDefineday. (A mother's age at child birth)
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
  const females = people.filter(person => person.sex === 'f');

  const peopleWithMotherKnown = onlyWithSon === undefined
    ? people.filter(person => person.mother !== null)
    : people.filter(person => person.mother !== null
      && person.sex === 'm');

  const ages = peopleWithMotherKnown
    .filter(person => females.some(female => female.name === person.mother))
    .map(person => {
      const motherInfo = females.find(women => women.name === person.mother);

      return motherInfo ? person.born - motherInfo.born : 0;
    });

  const averageAgeDiff = ages.reduce((a, b) => a + b) / ages.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
