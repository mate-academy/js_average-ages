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
  const men = people.filter(person => century
    ? (peopleGender(person, 'm') && fromWhatCentury(person, century))
    : peopleGender(person, 'm')
  );

  return averageAge(men);
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
  const women = people.filter(person => withChildren
    ? hasChildren(people, person)
    : peopleGender(person, 'f')
  );

  return averageAge(women);
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
  const children = people.filter(person => onlyWithSon
    ? peopleGender(person, 'm') && hasMother(people, person)
    : hasMother(people, person)
  );

  const result = children.reduce((sum, child) => {
    const mother = people.find(person => person.name === child.mother);

    return sum + (child.born - mother.born);
  }, 0);

  return result / children.length;
}

function averageAge(people) {
  return people.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / people.length;
}

function fromWhatCentury(person, century) {
  return Math.ceil(person.died / 100) === century;
}

function peopleGender(person, sex) {
  return person.sex === sex;
}

function hasChildren(people, person) {
  return people.some(child => child.mother === person.name);
}

function hasMother(people, person) {
  return people.some(woman => woman.name === person.mother);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
