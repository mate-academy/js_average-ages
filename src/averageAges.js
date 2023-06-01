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
    ? people.filter(person => Math.ceil(person.died / 100) === century)
    : people;

  const men = filteredPeople.filter(person => person.sex === 'm');
  const totalAge = men.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  return men.length > 0 ? totalAge / men.length : 0;
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
    ? people.filter(person => {
      return people.some(otherPerson => otherPerson.mother === person.name);
    })
    : people;

  const women = filteredPeople.filter(person => person.sex === 'f');
  const totalAge = women.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  return women.length > 0 ? totalAge / women.length : 0;
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
  const children = people.filter(person =>
    people.find(mother => mother.name === person.mother)
    && (onlyWithSon ? person.sex === 'm' : true)
  );

  const diffAge = children.map(child => {
    const mother = people.find(person => person.name === child.mother);

    return child.born - mother.born;
  });

  return diffAge.reduce((accumulator, age) =>
    accumulator + age, 0) / children.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
