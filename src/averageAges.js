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
  let mensList = [];

  mensList = arguments.length > 1 ? people.filter(person => {
    if (Math.ceil(person.died / 100) === century) {
      return person.sex === 'm';
    }
  }) : people.filter(person => person.sex === 'm');

  const mensAgesList = mensList.map(person => person.died - person.born);
  const sumOfMensAges = mensAgesList.reduce((acc, current) => acc + current, 0);

  return sumOfMensAges / mensAgesList.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let womenList = [];

  womenList = arguments.length > 1 ? people.filter(haveMother => {
    return people.find(child => haveMother.name === child.mother);
  }) : people.filter(person => person.sex === 'f');

  const womenAgesList = womenList.map(person => person.died - person.born);

  const sumOfAges = womenAgesList.reduce((acc, current) => acc + current, 0);

  return sumOfAges / womenAgesList.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  let kidsList = [];

  kidsList = arguments.length > 1 ? people.filter(child => (
    child.sex === 'm'
      && people.find(mother =>
        mother.name === child.mother))) : people.filter(child => (
    people.find(mother => mother.name === child.mother
    )
  ));

  const ageDifferenceList = kidsList.map(child => {
    const motherOfChild = people.find(mother => mother.name === child.mother);

    return child.born - motherOfChild.born;
  });

  const geGupSum = ageDifferenceList.reduce((acc, current) => acc + current, 0);

  return geGupSum / ageDifferenceList.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
