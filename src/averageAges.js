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
  const allMen = people.filter(person => century
    ? person.sex === 'm'
    && Math.ceil(person.died / 100) === century
    : person.sex === 'm');

  const sumOfAges = allMen
    .map(man => man.died - man.born)
    .reduce((prevMan, curentMan) => prevMan + curentMan
    );

  return sumOfAges / allMen.length;
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
  const allWomen = people.filter(person => withChildren
    ? person.sex === 'f'
    && people.some(child => child.mother === person.name)
    : person.sex === 'f'
  );

  const sumOfAges = allWomen
    .map(person => person.died - person.born)
    .reduce((prevPerson, curentPerson) => prevPerson + curentPerson);

  return sumOfAges / allWomen.length;
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
  const allChildren = people
    .filter(person => people.some(mama => mama.name === person.mother));

  const maleChildren = allChildren.filter(person => person.sex === 'm');

  const children = onlyWithSon
    ? maleChildren
    : allChildren;

  const ageDifference = children
    .reduce((ageSum, kid) => ageSum + (kid.born - people
      .find(person => person.name === kid.mother).born), 0
    );

  return ageDifference / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
