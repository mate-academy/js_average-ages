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
  const filteredPeople = century
    ? people.filter((person) => Math.ceil(person.died / 100) === century)
    : people;

  return calculateAverageAge(filteredPeople, 'm');
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
  const filteredPeople = withChildren
    ? people.filter((person, id, peopleArr) => peopleArr.some((candidate) => (
      candidate.mother === person.name
    )))
    : people;

  return calculateAverageAge(filteredPeople, 'f');
}

const calculateAverageAge = (people, gender) => {
  let filteredPeople = people.filter((person) => person.sex === gender);

  filteredPeople = filteredPeople.map((person) => person.died - person.born);

  return filteredPeople.reduce((person1, person2) => (
    person1 + person2
  )) / filteredPeople.length;
};

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
  let filteredPeople = people.filter((person) => person.mother !== null);

  filteredPeople = onlyWithSon
    ? filteredPeople.filter((person) => person.sex === 'm')
    : filteredPeople;

  filteredPeople = filteredPeople.map((person) => {
    const foundMother = people.find((mother) => mother.name === person.mother);

    return foundMother ? person.born - foundMother.born : 'not found';
  });
  filteredPeople = filteredPeople.filter((age) => age !== 'not found');

  return filteredPeople.reduce((mother1, mother2) => (
    mother1 + mother2
  )) / filteredPeople.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
