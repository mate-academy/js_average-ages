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
  const filteredMen = people.filter(element => element.sex === 'm');
  const personDied = filteredMen.filter(element =>
    Math.ceil(element.died / 100) === century);

  if (century) {
    const ageDied = personDied.map((person) => person.died - person.born);
    const sumAgeDied = ageDied.reduce((age1, age2) => age1 + age2);
    const avarageAgeDied = sumAgeDied / ageDied.length;

    return avarageAgeDied;
  } else {
    const ageMen = filteredMen.map((person) => person.died - person.born);
    const sumAgeMen = ageMen.reduce((age1, age2) => age1 + age2);
    const avarageAgeMen = sumAgeMen / ageMen.length;

    return avarageAgeMen;
  }
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
  const filteredWomen = people.filter(element => element.sex === 'f');

  if (withChildren) {
    const mother = people.map(element => element.mother);
    const filteredMothers = filteredWomen.filter(elemenent =>
      mother.includes(elemenent.name));
    const ageWomenWithChildren = filteredMothers.map((person) =>
      person.died - person.born);
    const sumAgeWomenWithChildren = ageWomenWithChildren.reduce((age1, age2) =>
      age1 + age2);
    const avarageAgeWomenWithChildren = sumAgeWomenWithChildren
    / ageWomenWithChildren.length;

    return avarageAgeWomenWithChildren;
  } else {
    const ageWomen = filteredWomen.map((person) => person.died - person.born);
    const sumAgeWomen = ageWomen.reduce((age1, age2) => age1 + age2);
    const avarageAgeWomen = sumAgeWomen / ageWomen.length;

    return avarageAgeWomen;
  }
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
  const kid = people.filter(child => (onlyWithSon !== undefined)
    ? people.find(parents => child.mother === parents.name && child.sex === 'm')
    : people.find(perents => child.mother === perents.name)
  );

  const difference = kid.map(child => (child.born - people.find(
    perents => perents.name === child.mother).born)
  );

  const age = difference.reduce((a, b) => a + b);

  return age / kid.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
