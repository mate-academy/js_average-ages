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
  let mens = [];

  century === undefined
    ? mens = people.filter((person) => person.sex === 'm')
    : mens = people.filter((person) => person.sex === 'm'
      && Math.ceil(person.died / 100) === century);

  const livesTime = mens.map((person) => (person.died - person.born));
  const averageAge = livesTime.reduce((a, b) => (a + b)) / livesTime.length;

  return Math.round(averageAge * 100) / 100;
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
  const women = people.filter((woman) => woman.sex === 'f');
  const mothers = people.map((mother) => mother.mother);
  const womenIsMother = women.filter((woman) => {
    return mothers.includes(woman.name, 0);
  });
  let womenForAverage = [];

  withChildren === false
    ? womenForAverage = women
    : womenForAverage = womenIsMother;

  const livesTime = womenForAverage.map((person) => {
    return (person.died - person.born);
  });

  const averageAge = livesTime.reduce((a, b) => (a + b)) / livesTime.length;

  return Math.round(averageAge * 100) / 100;
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
  const women = people.filter((person) => person.sex === 'f')
    .map((w) => w.name);
  const kidHaveMother = people.filter((p) => women.includes(p.mother));
  const onlySons = kidHaveMother.filter((p) => p.sex === 'm');
  let typeArrForAverage = [];

  onlyWithSon === false
    ? typeArrForAverage = kidHaveMother
    : typeArrForAverage = onlySons;

  const differense = typeArrForAverage.map((kid) => {
    const mother = people.find((w) => w.name === kid.mother);

    return kid.born - mother.born;
  });

  const averageDiffernce = differense.reduce((a, b) => (a + b))
    / differense.length;

  return averageDiffernce;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
