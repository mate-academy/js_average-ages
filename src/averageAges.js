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
function calculateMenAverageAge(people, century = 0) {
  const menArray = people.filter(men => men.sex === 'm'
    && (century ? Math.ceil(men.died / 100) === century : true));

  return calculateAverageAge(menArray);
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
  const womenArray = (withChildren === false)
    ? people.filter(woman => woman.sex === 'f')
    : people.filter(woman => people.map(w => w.mother).includes(woman.name));

  return calculateAverageAge(womenArray);
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
  const children = people.filter(person =>
    (onlyWithSon ? person.sex === 'm' : true)
    && people.find(mother => mother.name === person.mother)
  );

  const ageDifference = children.map(child => {
    const personMother = people.find(mother => mother.name === child.mother);

    return child.born - personMother.born;
  });

  const yearsSum = ageDifference.reduce((sum, years) =>
    sum + years, 0);

  return yearsSum / ageDifference.length;
}

function calculateAverageAge(array) {
  const yearsSum = array.reduce((years, man) =>
    years + (man.died - man.born), 0);

  return yearsSum / array.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
