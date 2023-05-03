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
  const peopleMen = people.filter((person) => person.sex === 'm'
    && (Math.ceil(person.died / 100) === century || !century));
  const ageMen = peopleMen.map((personMen) => personMen.died - personMen.born);
  const averageAgeMen = (ageMen.reduce((sumAge, current) =>
    sumAge + current)) / ageMen.length;

  return averageAgeMen;
  // write code here
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
  const peopleWomen = people.filter((person) => person.sex === 'f'
    && (people.some((searchMother) => searchMother.mother === person.name)
    || !withChildren));
  const ageWomen = peopleWomen.map((personWomen) =>
    personWomen.died - personWomen.born);
  const averageAgeWomen = (ageWomen.reduce((sumAge, current) =>
    sumAge + current)) / ageWomen.length;

  return averageAgeWomen;
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
  const filteredPeople = people.filter((person) =>
    person.mother !== null && people.find((p) =>
      p.name === person.mother && p.sex === 'f')
      && (!onlyWithSon || (onlyWithSon && person.sex === 'm')));

  const ageDiffs = filteredPeople.map((person) => {
    const mother = people.find((p) =>
      p.name === person.mother && p.sex === 'f');

    return person.born - mother.born;
  });

  const averageAgeDiff = ageDiffs.reduce((acc, val) =>
    acc + val, 0) / ageDiffs.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
