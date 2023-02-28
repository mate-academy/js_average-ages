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
    ? checkGender(person, 'm')
      && calculateCentury(person, century)
    : checkGender(person, 'm'));

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
    ? checkGender(person, 'f')
      && hasChildren(people, person)
    : checkGender(person, 'f'));

  return averageAge(women);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age diff between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age diff only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(person => onlyWithSon
    ? people.some(woman => woman.name === person.mother)
      && checkGender(person, 'm')
    : people.some(woman => woman.name === person.mother));

  const diff = children.map(child => {
    const mother = people.find(mom => mom.name === child.mother);

    return child.born - mother.born;
  });

  return diff.reduce((total, age) => total + age, 0) / diff.length;
}

// Util funcs
const checkGender = (person, gender) => person.sex === gender;

const calculateCentury = (person, century) => {
  return Math.ceil(person.died / 100) === century;
};

const averageAge = people => {
  return people.reduce((total, person) =>
    total + (person.died - person.born), 0) / people.length;
};

const hasChildren = (people, person) => {
  return people.some(child => child.mother === person.name);
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
