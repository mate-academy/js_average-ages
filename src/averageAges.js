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
  const malePerson = people.filter(person => {
    return person.sex === 'm' && (
      !century
      || Math.ceil(person.died / 100) === century
    );
  });

  return calculateAvgAge(malePerson);
}

function calculateAvgAge(callback) {
  const personAges = callback.map(person => person.died - person.born);
  const sumOfAges = personAges.reduce((sum, age) => sum + age, 0);
  const averageAge = sumOfAges / personAges.length;

  return averageAge;
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
  const femalePerson = people.filter(person => {
    return person.sex === 'f' && (
      !withChildren
      || people.some(child => child.mother === person.name)
    );
  });

  return calculateAvgAge(femalePerson);
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
  const children = people.filter(person => {
    return people.some(mother => mother.name === person.mother)
    && (!onlyWithSon || person.sex === 'm');
  });

  const ageDifference = children.map(child => {
    const mother = people.find(person => person.name === child.mother);

    return (child.born - mother.born);
  });

  const sumOfAges = ageDifference.reduce((sum, age) => sum + age, 0);
  const averageAge = sumOfAges / ageDifference.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
