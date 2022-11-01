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
  const man = !century
    ? getPersonByGender('m', people)
    : getPersonByGender('m', people)
      .filter(person => Math.ceil(person.died / 100) === century);

  return getAverageAge(man);
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
  const women = !withChildren
    ? getPersonByGender('f', people)
    : getPersonByGender('f', people)
      .filter(female => (people.find(person => person.mother === female.name)));

  return getAverageAge(women);
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
  const children = !onlyWithSon
    ? people.filter(child => (
      people.find(mother => child.mother === mother.name)))

    : people.filter(person => (
      people.find(mother => person.mother === mother.name)
       && person.sex === 'm'));

  const childMotherAgeDif = children.map(child =>
    child.born - people.find(mother =>
      child.mother === mother.name).born);

  return childMotherAgeDif.reduce((a, b) => a + b, 0) / children.length;
}

function getAverageAge(people) {
  return people.map(a => a.died - a.born)
    .reduce((a, b) => a + b) / people.length;
}

function getPersonByGender(gender, people) {
  return people.filter(person => person.sex === gender);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
