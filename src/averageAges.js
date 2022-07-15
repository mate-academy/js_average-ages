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
  const menArray = people.filter(person => person.sex === 'm');
  const diedCentury = menArray.filter(person =>
    (Math.ceil(person.died / 100)) === century);

  const averageMenAge = century
    ? diedCentury.map(age =>
      age.died - age.born).reduce((prev, current) =>
      prev + current) / diedCentury.length
    : menArray.map(age =>
      age.died - age.born).reduce((prev, current) =>
      prev + current) / menArray.length;

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
  const womenArray = people.filter(person => person.sex === 'f');
  const mothersArray = womenArray.filter(woman =>
    people.find(person => person.mother === woman.name));

  const averageWomenAge = withChildren
    ? mothersArray.map(age =>
      age.died - age.born).reduce((prev, current) =>
      prev + current) / mothersArray.length
    : womenArray.map(age =>
      age.died - age.born).reduce((prev, current) =>
      prev + current) / womenArray.length;

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
  const mothers = people.filter(woman =>
    people.find(person => person.mother === woman.name));

  const relativesArray = onlyWithSon
    ? people.filter(child =>
      mothers.find(mother => mother.name === child.mother) && child.sex === 'm')
    : people.filter(child =>
      mothers.find(mother => mother.name === child.mother));

  const agesDifference = relativesArray.map(child =>
    child.born - mothers.find(mother => child.mother === mother.name).born);

  return agesDifference.reduce((prev, current) =>
    prev + current) / agesDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
