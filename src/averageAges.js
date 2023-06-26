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
  const filteredPeople = people.filter(person =>
    person.sex === 'man' && (century === undefined
      || Math.ceil(person.died / 100) === century)
  );

  const menAgesSum = filteredPeople.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  const menCount = filteredPeople.length;

  return menCount > 0 ? menAgesSum / menCount : 0;
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
  const filteredPeople = people.filter(person =>
    person.sex === 'female' && (!withChildren || hasChildren(person, people))
  );

  const womenAgesSum = filteredPeople.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  const womenCount = filteredPeople.length;

  return womenCount > 0 ? womenAgesSum / womenCount : 0;
}

function hasChildren(person, people) {
  return people.some(child => child.mother === person.name);
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
  const ageDiffs = [];

  people.forEach(mother => {
    const children = people.filter(child =>
      child.mother === mother.name && (!onlyWithSon || child.sex === 'man'));

    children.forEach(child => {
      const ageDiff = child.born - mother.born;

      ageDiffs.push(ageDiff);
    });
  });

  const sum = ageDiffs.reduce((accumulator, currentValue) =>
    accumulator + currentValue, 0);

  const average = ageDiffs.length > 0 ? sum / ageDiffs.length : 0;

  return average;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
