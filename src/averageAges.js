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

const calculateCentury = (person) => Math.ceil(person.died / 100);
const calculateAge = (person) => person.died - person.born;
const isMale = (person) => person.sex === 'm';
const isFemale = (person) => person.sex === 'f';
const calculateAverageAge = (ages) => ages.reduce(
  (a, b) => a + b) / ages.length;
const findMother = (child, mother) => child.mother === mother.name;

function calculateMenAverageAge(people, century) {
  const menArray = people.filter(person => isMale(person));

  const filteredMenArray = century
    ? menArray.filter(man => calculateCentury(man) === century)
    : menArray;

  const menAgesArray = filteredMenArray.map(man => calculateAge(man));

  return calculateAverageAge(menAgesArray);
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
  const womenArray = people.filter(person => isFemale(person));

  const filteredWomenArray = withChildren
    ? womenArray.filter(woman => people.find(child =>
      findMother(child, woman)))
    : womenArray;

  const womenAgesArray = filteredWomenArray.map(woman => calculateAge(woman));

  return calculateAverageAge(womenAgesArray);
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
  const childrenArray = onlyWithSon
    ? people.filter(child => isMale(child)
    && people.find(mother => findMother(child, mother)))
    : people.filter(child =>
      people.find(mother => findMother(child, mother)));

  const ageDiffArray = childrenArray.map(child =>
    child.born - people.find(mother => findMother(child, mother)).born);

  return calculateAverageAge(ageDiffArray);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
