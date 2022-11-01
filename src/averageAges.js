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
  const men = people.filter(person => person.sex === 'm');

  const menFromNeededCentury = men.filter(person =>
    Math.ceil(person.died / 100) === century
  );

  let totalMenAge = 0;
  let averageMenAge = 0;

  if (!century) {
    totalMenAge = men.reduce((prev, person) =>
      prev + (person.died - person.born), 0);

    averageMenAge = totalMenAge / men.length;
  } else {
    totalMenAge = menFromNeededCentury.reduce((prev, person) =>
      prev + (person.died - person.born), 0);

    averageMenAge = totalMenAge / menFromNeededCentury.length;
  }

  return averageMenAge;
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
  const women = people.filter(person => person.sex === 'f');

  const womenWithChildren = women.filter(person =>
    people.find(mother =>
      person.name === mother.mother
    ));

  let totalWomenAge = 0;
  let averageWomenAge = 0;

  if (!withChildren) {
    totalWomenAge = women.reduce((prev, person) =>
      prev + (person.died - person.born), 0);

    averageWomenAge = totalWomenAge / women.length;
  } else {
    totalWomenAge = womenWithChildren.reduce((prev, person) =>
      prev + (person.died - person.born), 0);

    averageWomenAge = totalWomenAge / womenWithChildren.length;
  }

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
function calculateAverageAgeDiff(people, onlyWithSon) {
  const women = people.filter(person => person.sex === 'f');

  const womenWithChildren = women.filter(woman =>
    people.find(person =>
      woman.name === person.mother
    ));

  const womenWithSons = womenWithChildren.filter(woman =>
    people.find(person =>
      person.mother === woman.name && person.sex === 'm'
    ));

  const men = people.filter(person => person.sex === 'm');

  const sons = men.filter(person =>
    womenWithSons.find(mother =>
      person.mother === mother.name
    ));

  const children = people.filter(person =>
    people.find(mother =>
      person.mother === mother.name
    ));

  let totalDiffAge = 0;
  let averageDiffAge = 0;

  if (!onlyWithSon) {
    totalDiffAge = children
      .reduce((prev, person) => prev + (person.born - womenWithChildren
        .find(woman => woman.name === person.mother).born
      ), 0);

    averageDiffAge = totalDiffAge / children.length;
  } else {
    totalDiffAge = sons
      .reduce((prev, person) => prev + (person.born - womenWithSons
        .find(woman => woman.name === person.mother).born
      ), 0);

    averageDiffAge = totalDiffAge / sons.length;
  }

  return averageDiffAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
