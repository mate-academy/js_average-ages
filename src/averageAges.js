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
  const filteredMen = people.filter(person => person.sex === 'm');
  const filteredMenCentury = century !== undefined
    ? filteredMen.filter(person =>
      Math.ceil(person.died / 100) === century) : filteredMen;

  return filteredMenCentury.length > 0
    ? calculateAverageAge(filteredMenCentury) : 0;
}

function calculateAverageAge(people) {
  const totalAge = people.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  return totalAge / people.length;
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
  const filteredWomen = people.filter(person => person.sex === 'f');
  const womenWithChildren = withChildren ? filteredWomen.filter(woman =>
    people.some(person => person.mother === woman.name)) : filteredWomen;

  return womenWithChildren.length > 0
    ? calculateAverageAge(womenWithChildren) : 0;
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
  const filteredMothers = people.filter(person =>
    people.some(p => p.mother === person.name)
  );

  const filteredChildren = people.filter(person =>
    people.some(p => p.name === person.mother)
  );

  const filteredSons = onlyWithSon ? people.filter(person =>
    people.some(p => p.name === person.mother) && person.sex === 'm'
  ) : filteredChildren;

  const averageAgeDiff = calculateAverageAgeDifference(filteredSons,
    filteredMothers);

  return averageAgeDiff;
}

function calculateAverageAgeDifference(children, mothers) {
  const ageDiffs = children.map(child => {
    const mother = mothers.find(m => m.name === child.mother);

    return mother && mother.born ? child.born - mother.born : null;
  });

  const validAgeDiffs = ageDiffs.filter(ageDiff => ageDiff !== null);
  const totalAgeDiff = validAgeDiffs.reduce((sum, ageDiff) => sum + ageDiff, 0);
  const averageAgeDiff = totalAgeDiff / validAgeDiffs.length || 0;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
