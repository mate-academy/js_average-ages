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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const filterBySex = people.filter(person => person.sex === 'm');

  const filterPeople = century > 0
    ? filterBySex.filter(person =>
      Math.ceil(person.died / 100) === century)
    : filterBySex;

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
  // write code here
  const filterBySex = people.filter(person => person.sex === 'f');

  const filterPeople = withChildren
    ? filterBySex.filter(personF =>
      people.some(person => person.mother === personF.name))
    : filterBySex;

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
  // write code here
  const filterBySex = people.filter(person => person.sex === 'f');
  let count = 0;

  const childs = onlyWithSon
    ? people.filter(person => person.sex === 'm')
    : people;

  const sumAgeOfBorn = childs.reduce((sum, personChild) => {
    const mother = filterBySex.find(personMother =>
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
