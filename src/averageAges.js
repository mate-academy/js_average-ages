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
  const man = century
    ? people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');
  const manAge = man.map(person => person.died - person.born);
  const manMiddleAge = manAge.reduce((age, currentAge) =>
    age + currentAge) / manAge.length;

  return manMiddleAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *`
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const womanWithChildren = people.filter(person =>
    people.find(children => children.mother === person.name));
  const everyoneWoman = people.filter(person => person.sex === 'f');
  const withChildrenOrNot = withChildren ? womanWithChildren : everyoneWoman;
  const ageWoman = withChildrenOrNot.map(women => women.died - women.born)
    .reduce((sumAge, currentAge) => sumAge + currentAge);

  return ageWoman / withChildrenOrNot.length;
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
  const womanWithChildren = people.filter(mother =>
    people.find(children => children.mother === mother.name));
  const childrenToMother = people.filter(child =>
    womanWithChildren.find(mother => onlyWithSon
      ? child.mother === mother.name && child.sex === 'm'
      : child.mother === mother.name
    ));
  const ageDiff = childrenToMother
    .map(human => human.born - people
      .find(woman => woman.name === human.mother).born)
    .reduce((sum, age) => sum + age, 0) / childrenToMother.length;

  return ageDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
