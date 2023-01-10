'use strict';

/**
 * { 'name': 'Carolus Haverbeke', 'sex': 'm', 'born': 1832, 'died': 1905,
 * 'father': 'Carel Haverbeke', 'mother': 'Maria van Brussel' },
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
  const menToCount = people.filter(person => {
    return century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm';
  });

  const totalAge = menToCount.reduce((sum, person) => {
    const personAge = person.died - person.born;

    return sum + personAge;
  }, 0);

  return totalAge / menToCount.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 * { 'name': 'Carolus Haverbeke', 'sex': 'm', 'born': 1832, 'died': 1905,
 * 'father': 'Carel Haverbeke', 'mother': 'Maria van Brussel' },
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const womenToCount = people.filter(person => {
    return withChildren
      ? person.sex === 'f' && people.some(child => child.mother === person.name)
      : person.sex === 'f';
  });

  const totalAge = womenToCount.reduce((sum, person) => {
    const personAge = person.died - person.born;

    return sum + personAge;
  }, 0);

  return totalAge / womenToCount.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *  { 'name': 'Carolus Haverbeke', 'sex': 'm', 'born': 1832, 'died': 1905,
 * 'father': 'Carel Haverbeke', 'mother': 'Maria van Brussel' },
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const childrenToCount = people.filter(person => {
    return onlyWithSon
      ? people.some(mother => person.mother === mother.name)
        && (person.sex === 'm')
      : people.some(mother => person.mother === mother.name);
  });

  const totalAgeDiff = childrenToCount.reduce((difference, person1) => {
    const mother = people.find(person2 => person1.mother === person2.name);

    return difference + person1.born - mother.born;
  }, 0);

  return totalAgeDiff / childrenToCount.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
