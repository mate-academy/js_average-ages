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
const findPeopleAge = (people) => {
  return people
    .map(age => age.died - age.born);
};

const findAverageAge = (people) => {
  return people
    .reduce((previousAge, currentAge) =>
      previousAge + currentAge) / people.length;
};

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm');
  const CalculatecenturyOfMensLife = century
    ? men.filter(
      person => Math.ceil(person.died / 100) === century
    )
    : men;

  return findAverageAge(findPeopleAge(CalculatecenturyOfMensLife));
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
  const findWomenWithChildren = withChildren
    ? people.filter(person => people.find(
      child => person.name === child.mother
    ))
    : people.filter(person => person.sex === 'f');

  return findAverageAge(findPeopleAge(findWomenWithChildren));
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
  const findChildren = people.filter(person => (
    onlyWithSon
      ? people.find(mother => mother.name === person.mother)
        && person.sex === 'm'
      : people.find(mother => mother.name === person.mother)
  ))
    .map(
      child => child.born - people
        .find(mother => mother.name === child.mother).born
    );

  return findAverageAge(findChildren);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
