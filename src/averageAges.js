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
  const filteredMan = (century !== undefined)
    ? people.filter(person =>
      Math.ceil(person.died / 100) === century
      && person.sex === 'm'
    )
    : people.filter(person => person.sex === 'm');

  return calculateAverageAge(filteredMan);
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
  const filteredWoman = (withChildren !== undefined)
    ? people.filter(person =>
      people.some(child =>
        child.mother === person.name
        && person.sex === 'f'
      )
    )
    : people.filter(person => person.sex === 'f');

  return calculateAverageAge(filteredWoman);
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
  const filteredHasMother = (onlyWithSon !== undefined)
    ? people.filter(person =>
      person.sex === 'm'
      && people.find(mother => mother.name === person.mother)
    )
    : people.filter(person =>
      people.find(mother => mother.name === person.mother)
    );

  const sumOfAges = filteredHasMother.reduce((sum, person) => {
    const ageDiff = (person.born - people.find(mother =>
      mother.name === person.mother).born
    );

    return sum + ageDiff;
  }, 0);

  return sumOfAges / filteredHasMother.length;
}

// Helper function to calculate average age:

function calculateAverageAge(filteredArray) {
  const sumOfAges = filteredArray.reduce((sum, person) =>
    sum + (person.died - person.born), 0
  );

  const averageAge = sumOfAges / filteredArray.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
