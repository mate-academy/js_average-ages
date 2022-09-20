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
  const filteredIsMan = people.filter(person => person.sex === 'm');

  const filteredByCentury = (century !== undefined)
    ? filteredIsMan.filter(person => Math.ceil(person.died / 100) === century)
    : filteredIsMan;

  const sumOfAges = filteredByCentury.reduce((sum, person) =>
    sum + (person.died - person.born), 0
  );

  const averageAge = sumOfAges / filteredByCentury.length;

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
  const filteredIsWoman = people.filter(person => person.sex === 'f');

  const filteredHasChildren = (withChildren !== undefined)
    ? filteredIsWoman.filter(mother =>
      people.some(child => child.mother === mother.name)
    )
    : filteredIsWoman;

  const sumOfAges = filteredHasChildren.reduce((sum, person) =>
    sum + (person.died - person.born), 0
  );

  const averageAge = sumOfAges / filteredHasChildren.length;

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
  const filteredHasMother = people.filter(person => {
    const personsMother = people.find(mother => mother.name === person.mother);

    // if mother was found let's put her year of birth to persons object:

    if (personsMother !== undefined) {
      person.motherBorn = personsMother.born;
    }

    return personsMother;
  });

  const filteredIsSon = (onlyWithSon !== undefined)
    ? filteredHasMother.filter(person => person.sex === 'm')
    : filteredHasMother;

  const sumOfAges = filteredIsSon.reduce((sum, person) => {
    const ageDiff = (person.born - person.motherBorn);

    return sum + ageDiff;
  }, 0);

  const averageAge = sumOfAges / filteredIsSon.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
