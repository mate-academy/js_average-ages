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
  const men = century
    ? people.filter((person) => person.sex === 'm'
        && Math.ceil(person.died / 100) === century)
    : people.filter((person) => person.sex === 'm');

  return averageAge(men);
}

const averageAge = function(arr) {
  const livesTime = arr.map((person) => (person.died - person.born));
  const age = livesTime.reduce((sum, years) => (sum + years))
    / livesTime.length;

  return Math.round(age * 100) / 100;
};

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

  const womenForAverage = withChildren
    ? womenIsMother
    : women;

  return averageAge(womenForAverage);
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
    .map((woman) => woman.name);
  const kidHaveMother = people
    .filter((person) => women.includes(person.mother));
  const onlySons = kidHaveMother.filter((person) => person.sex === 'm');

  const typeArrForAverage = onlyWithSon
    ? onlySons
    : kidHaveMother;

  const differense = typeArrForAverage.map((kid) => {
    const mother = people.find((woman) => woman.name === kid.mother);

    return kid.born - mother.born;
  });

  const averageDiffernce = differense.reduce((sum, years) => (sum + years))
    / differense.length;

  return averageDiffernce;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
