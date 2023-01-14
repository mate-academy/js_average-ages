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
  const men = people.filter(person => person.sex === 'm');

  const filterPeople = century > 0
    ? men.filter(person =>
      Math.ceil(person.died / 100) === century)
    : men;

  return averageAge(filterPeople);
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

  const filterPeople = withChildren
    ? women.filter(personF =>
      people.some(person => person.mother === personF.name))
    : women;

  return averageAge(filterPeople);
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
  const women = people.filter(person => person.sex === 'f');
  let count = 0;

  const children = onlyWithSon
    ? people.filter(person => person.sex === 'm')
    : people;

  const sumAgeOfBorn = children.reduce((sum, personChild) => {
    const mother = women.find(personMother =>
      personChild.mother === personMother.name);
    let ageOfMother = 0;

    count++;

    mother
      ? ageOfMother = personChild.born - mother.born
      : count--;

    return sum + ageOfMother;
  }, 0);

  return sumAgeOfBorn / count;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

function averageAge(arr) {
  return arr.reduce((sum, person) =>
    sum + person.died - person.born, 0) / arr.length;
};
