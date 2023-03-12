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
  const malePerson = people.filter(person => person.sex === 'm');

  const filtredPersonByCentury = malePerson.filter(
    person => Math.ceil(person.died / 100) === century);

  const centuryOrNot = century ? filtredPersonByCentury : malePerson;

  const personAge = centuryOrNot.map(person => person.died - person.born);

  const averageAge = personAge.reduce(
    (sum, age) => sum + age) / personAge.length;

  return averageAge;
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  let ageWomen = 0;

  const femaleWomen = people.filter(person => person.sex === 'f');

  const mothers = femaleWomen.filter(
    women => people.some(person => person.mother === women.name));

  const womenWithChildOrNot = withChildren ? mothers : femaleWomen;

  ageWomen = womenWithChildOrNot.map(person => person.died - person.born);

  const averageAge = ageWomen.reduce((sum, age) => sum + age) / ageWomen.length;

  return averageAge;
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
  const femaleWomen = people.filter(person => person.sex === 'f');

  const mothers = femaleWomen.filter(
    women => people.some(person => person.mother === women.name));

  const children = people.filter(
    person => mothers.some(mother => person.mother === mother.name));

  const sons = children.filter(child => child.sex === 'm');

  const allChildrenOrSons = onlyWithSon ? sons : children;

  const res = allChildrenOrSons.map(child => {
    const foundMom = mothers.find(mom => mom.name === child.mother);

    return foundMom ? child.born - foundMom.born : null;
  }).filter(val => val !== null);

  const difference = res.reduce(
    (sum, item) => sum + item) / res.length;

  return difference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
