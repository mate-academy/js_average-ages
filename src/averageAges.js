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
function calculateAverageAge(people) {
  const peopleAges = people.map((person) => {
    return person.died - person.born;
  });

  const averageAge = peopleAges.reduce((prevPerson, nextPerson) => {
    return prevPerson + nextPerson;
  }, 0) / peopleAges.length;

  return averageAge;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => {
    return century
      ? Math.ceil(person.died / 100) === century
      && person.sex === 'm'
      : person.sex === 'm';
  });

  return calculateAverageAge(men);
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
  const women = people
    .filter(person => {
      return withChildren
        ? person.sex === 'f'
        && people.some(human => person.name === human.mother)
        : person.sex === 'f';
    });

  return calculateAverageAge(women);
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
  const childs = people
    .filter(person => {
      return onlyWithSon
        ? people.some(human => person.sex === 'm'
          && person.mother === human.name)
        : people.some(human => person.mother === human.name);
    });

  const ageDiffer = childs.map(person => {
    const childBirthDate = person.born;
    const mother = people.find(ownMother => person.mother === ownMother.name);
    const motherBirthDate = mother.born;

    return childBirthDate - motherBirthDate;
  });

  const averageAgeDiff = ageDiffer.reduce((prevValue, nextValue) => {
    return prevValue + nextValue;
  }, 0) / ageDiffer.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
