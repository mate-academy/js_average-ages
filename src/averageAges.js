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
  let men = people.filter(person => person.sex === 'm');

  if (century) {
    men = men.filter(person => Math.ceil(person.died / 100) === century);
  }

  const totalAge = men.reduce((sum, person) => {
    return sum + (person.died - person.born);
  }, 0);
  const averageAge = totalAge / men.length;

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
  let women;

  if (withChildren) {
    women = people.filter(person => {
      return people.some(child => {
        return child.mother === person.name;
      });
    });
  } else {
    women = people.filter(person => person.sex === 'f');
  }

  const totalAge = women.reduce((sum, woman) => {
    return sum + (woman.died - woman.born);
  }, 0);
  const averageAge = totalAge / women.length;

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
  let children;

  if (onlyWithSon) {
    children = people.filter(
      person => person.sex === 'm' && people.some(
        woman => woman.name === person.mother
      ));
  } else {
    children = people.filter(person => people.some(
      woman => woman.name === person.mother
    ));
  }

  const mothers = children.map(
    child => child.born - (people.find(
      person => person.name === child.mother).born));
  const ageDiffs = mothers.reduce((sum, diff) => sum + diff, 0);

  return ageDiffs / ageDiffs.length;
}

// const motherAge = children.map(child =>
//   child.born - (people.find(person => person.name === child.mother).born)
// );

// const total = motherAge.reduce((sum, age) => sum + age, 0);


// return total / children.length;
// }

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
