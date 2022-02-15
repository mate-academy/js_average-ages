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
  const mailPeople = people.filter(person => {
    return person.sex === 'm'
      && (!century || Math.ceil(person.died / 100) === century);
  });

  const sumOfAges = mailPeople.reduce((total, person) =>
    total + person.died - person.born, 0);

  return sumOfAges / mailPeople.length;
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
  const femalePeople = people.filter(person => {
    return person.sex === 'f'
      && (!withChildren || people.some(children =>
        children.mother === person.name));
  });

  const sumOfAges = femalePeople.reduce((prev, person) =>
    prev + person.died - person.born, 0);

  return sumOfAges / femalePeople.length;
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const getMother = (name) =>
    people.find(mother => name === mother.name);

  const childrenWithMother = people.filter((child) => (
    getMother(child.mother) && (!onlyWithSon || child.sex === 'm')
  ));

  const sumOfDiffAges = childrenWithMother.reduce((prev, child) => {
    return prev + child.born - getMother(child.mother).born;
  }, 0);

  return Math.round(sumOfDiffAges * 100 / childrenWithMother.length) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
