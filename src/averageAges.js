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
  const menAges = people.filter(person => {
    return person.sex === 'm'
  && (century ? Math.ceil(person.died / 100) === century : true);
  }).reduce((prev, { born, died }) => {
    prev.push(died - born);

    return prev;
  }, []);

  return menAges.reduce((a, b) => a + b, 0) / menAges.length || 0;
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
  const womenAges = people.filter((person, idx, arr) => {
    return person.sex === 'f'
    && (withChildren ? arr.some(child => child.mother === person.name) : true);
  }).reduce((prev, { born, died }) => {
    prev.push(died - born);

    return prev;
  }, []);

  return womenAges.reduce((a, b) => a + b, 0) / womenAges.length;
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
  const hasMother = (group, person) => {
    const mother = group.find(mthr => mthr.name === person.mother);

    return mother;
  };

  const ageDiff = [...people].filter((person, idx, arr) => {
    return hasMother(arr, person) !== undefined
    && (onlyWithSon ? person.sex === 'm' : true);
  }).reduce((prev, person) => {
    prev.push(
      person.born - people.find(mother => mother.name === person.mother).born
    );

    return prev;
  }, []);

  return ageDiff.reduce((a, b) => a + b, 0) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
