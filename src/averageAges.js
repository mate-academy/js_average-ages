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
  const filteredMen = people.filter(person =>
    person.sex === 'm'
    && (!century || Math.ceil(person.died / 100) === century));

  return +(filteredMen.reduce((prew, el, index, arr) => {
    return prew + (el.died - el.born) / arr.length;
  }, 0)).toFixed(2);
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
  function hasChildren(person) {
    return people.some(child => child.mother === person.name);
  }

  const filteredWomen = people.filter(person =>
    person.sex === 'f'
    && (!withChildren || hasChildren(person)));

  return +(filteredWomen.reduce((prew, el, index, arr) => {
    return prew + (el.died - el.born) / arr.length;
  }, 0)).toFixed(2);
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
  function hasChildren(person) {
    return people.some(child =>
      child.mother === person.name && (!onlyWithSon || child.sex === 'm'));
  }

  const filteredWomen = people.filter(mother =>
    mother.sex === 'f' && hasChildren(mother));

  const filterkids = people.filter(child => child.mother
    && (onlyWithSon ? child.sex === 'm' : true)
    && filteredWomen.some(person => person.name === child.mother));

  const diference = filterkids.reduce((totalDifference, child) => {
    const mother = people.find(person => person.name === child.mother);

    if (mother) {
      const ageDifference = child.born - mother.born;

      return totalDifference + ageDifference;
    }

    return totalDifference;
  }, 0);

  return +(diference / filterkids.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
