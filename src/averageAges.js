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
  let mens;
  const mensAges = [];
  let sumMensAges = 0;

  (arguments.length < 2)
    ? mens = people.filter(person => person.sex === 'm')
    : mens = people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century);

  mens.map(men => mensAges.push(men.died - men.born));
  sumMensAges = mensAges.reduce((sum, age) => sum + age, 0);

  const averageMenAge = sumMensAges / mens.length;

  return averageMenAge;
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
function calculateWomenAverageAge(people, withChildren = false) {
  let womens = people.filter(person => person.sex === 'f');
  const womensAges = [];
  const womensWithChild = [];

  if (withChildren) {
    for (const women of womens) {
      for (const { mother } of people) {
        if (women.name === mother) {
          womensWithChild.push(women);
          break;
        }
      }
    }

    womens = womensWithChild;
  }

  womens.map(women => womensAges.push(women.died - women.born));

  const sumWomenAge = womensAges.reduce((sum, age) => sum + age, 0);
  const averageWomenAge = sumWomenAge / womens.length;

  return averageWomenAge;
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  let peopleWithMom = people.filter(person => person.mother);
  const womens = people.filter(person => person.sex === 'f');
  const agesYoungMoms = [];

  if (onlyWithSon) {
    peopleWithMom = peopleWithMom.filter(person => person.sex === 'm');
  }

  for (const women of womens) {
    for (const person of peopleWithMom) {
      if (women.name === person.mother) {
        agesYoungMoms.push(person.born - women.born);
      }
    }
  }

  const sumMomsAges = agesYoungMoms.reduce((sum, age) => sum + age, 0);
  const averageYoungWomenAge = sumMomsAges / agesYoungMoms.length;

  return averageYoungWomenAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
