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
  let maleList = [];

  if (arguments.length > 1) {
    maleList = people.filter(person => {
      if (Math.ceil(person.died / 100) === century) {
        return person.sex === 'm';
      }
    });
  } else {
    maleList = people.filter(person => person.sex === 'm');
  }

  const maleAgesList = maleList.map(person => person.died - person.born);
  const sumOfMaleAges = maleAgesList.reduce((acc, current) => acc + current, 0);

  return sumOfMaleAges / maleAgesList.length;
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
  let femaleList = [];

  if (arguments.length > 1) {
    femaleList = people.filter(haveMother => {
      return people.find(child => haveMother.name === child.mother);
    });
  } else {
    femaleList = people.filter(person => person.sex === 'f');
  }

  const femaleAgesList = femaleList.map(person => person.died - person.born);

  const sumOfAges = femaleAgesList.reduce((acc, current) => acc + current, 0);

  return sumOfAges / femaleAgesList.length;
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

  if (arguments.length > 1) {
    kidsList = people.filter(child => (
      child.sex === 'm'
      && people.find(mother => mother.name === child.mother)));
  } else {
    kidsList = people.filter(child => (
      people.find(mother => mother.name === child.mother
      )
    ));
  }

  const ageDiffList = kidsList.map(child => {
    const motherOfChild = people.find(mother => mother.name === child.mother);

    return child.born - motherOfChild.born;
  });

  const geGupSum = ageDiffList.reduce((acc, current) => acc + current, 0);

  return geGupSum / ageDiffList.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
