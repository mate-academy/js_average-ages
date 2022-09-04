'use strict';

function calculateAverageAge(somePeople) {
  const sumAll = somePeople.reduce((sum, person) => {
    return sum + (person.died - person.born);
  }, 0);

  return sumAll / somePeople.length;
}

/**
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm');

  return calculateAverageAge(century ? men.filter(person =>
    Math.ceil(person.died / 100) === century) : men);
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
  const mothers = people.filter(mother => {
    return people.find(child => {
      return mother.name === child.mother;
    });
  });

  return calculateAverageAge(withChildren ? mothers : women);
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
  const children = people.filter(child =>
    onlyWithSon
      ? child.sex === 'm'
    && people.some(mother => mother.name === child.mother)
      : people.some(mother => mother.name === child.mother));

  return children.reduce((sum, child) => {
    const childMother = people.find(mother => mother.name === child.mother);

    return sum + (child.born - childMother.born) / children.length;
  }, 0);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
