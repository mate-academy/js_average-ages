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

const calculateAverageAge = (averageAge, people) => {
  return averageAge.length < 2
    ? averageAge[0]
    : averageAge.reduce((a, b) => a + b) / people.length;
}

const getAge = (people) => people.map(person => person.died - person.born);

const genderCheck = (people, gender) => {
  return people.filter(person => person.sex === gender);
}

function calculateMenAverageAge(people, century) {
  const males = century
    ? people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century)
    : genderCheck(people, 'm'); 

  return calculateAverageAge(getAge(males), males);
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
  const mothersName = people.map(person => person.mother);

  const females = withChildren
    ? people.filter(person => person.sex === 'f'
      && mothersName.includes(person.name))
    : genderCheck(people, 'f')

  return calculateAverageAge(getAge(females), females);
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
  const children = onlyWithSon
    ? people.filter(kid => people.some(mom => kid.sex === 'm'
      && kid.mother === mom.name))
    : people.filter(kid => people.some(mom => kid.mother === mom.name));

  const averageAge = children.map(kid => {
    const mother = people.find(mom => kid.mother === mom.name);

    return kid.born - mother.born;
  });

  return averageAge.reduce((a, b) => a + b) / averageAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
