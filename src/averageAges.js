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
  const men = people.filter(human => century
    ? (human.sex === 'm' && Math.ceil(human.died / 100) === century)
    : human.sex === 'm'
  );

  const averageAge = calculateAverageAge(men)

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
  const peopleWeNeed = withChildren
    ? people.filter(person => people.some(p => p.mother === person.name))
    : people;

  const women = peopleWeNeed.filter(person => person.sex === 'f');

  const sumOfAges = women.reduce((sum, woman) =>
    sum + (woman.died - woman.born), 0);
  const averageAge = sumOfAges / women.length;

  return averageAge;
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
  const motherWithSon = people.filter(child =>
    onlyWithSon
      ? isMotherOfChild(people, child) && child.sex === 'm'
      : isMotherOfChild(people, child)
  );

  return motherWithSon.reduce((sum, child) => sum
  + child.born - getMotherBirthYear(people, child), 0) / motherWithSon.length;
}

function isMotherOfChild(people, child) {
  return people.find(woman => child.mother === woman.name);
}

function getMotherBirthYear(people, child) {
  const mother = isMotherOfChild(people, child);
  return mother ? mother.born : null;
}

function calculateTotalAge(people) {
  return people.reduce((sum, person) => sum + (person.died - person.born), 0);
}

function calculateAverageAge(people) {
  const totalAge = calculateTotalAge(people);
  return totalAge / people.length;
}



module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
