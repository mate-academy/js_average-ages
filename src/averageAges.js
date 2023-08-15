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
const MALE = 'm';
const FEMALE = 'f';

function averageAgePeople(people) {
  return people
    .map(({ born, died }) => died - born)
    .reduce((sum, age) => sum + age, 0) / people.length;
}

function calculateMenAverageAge(people, century) {
  let men = people.filter(({ sex }) => sex === MALE);

  if (century) {
    men = men.filter(({ died }) => Math.ceil(died / 100) === century);
  }

  const averageAgeMen = averageAgePeople(men);

  return averageAgeMen;
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
  let women = people.filter(({ sex }) => sex === FEMALE);

  if (withChildren) {
    women = women
      .filter(woman => people.some(child => child.mother === woman.name));
  }

  const averageAgeWomen = averageAgePeople(women);

  return averageAgeWomen;
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
  const childrens = onlyWithSon
    ? people.filter(({ sex }) => sex === MALE) : people;

  const childrensHasMother = childrens
    .filter(child => people.find(mother => mother.name === child.mother));

  const differenceAge = childrensHasMother.map(child => (
    child.born - people.find(mother => mother.name === child.mother).born
  ));

  const averageAge = differenceAge
    .reduce((total, age) => total + age, 0)
    / differenceAge.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
