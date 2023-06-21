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
  const manFiltered = people.filter((person) => century
    ? Math.ceil(person.died / 100) === century
      && person.sex === 'm'
    : person.sex === 'm'
  );

  return calculateAverageAge(manFiltered);
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
  const womanFiltered = people.filter((person) => withChildren
    ? people
      .some(child =>
        child.mother === person.name
      )
    : person.sex === 'f'
  );

  return calculateAverageAge(womanFiltered);
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
  const peopleFiltered = people.filter(person => onlyWithSon
    ? person.sex === 'm'
      && person.mother
    : person.mother
      && people
        .find(pers =>
          pers.name === person.mother
        ));

  const ageDiffer = peopleFiltered
    .map(person => {
      const mother = people
        .find(pers =>
          pers.name === person.mother
        );

      return mother ? person.born - mother.born
        : null;
    });

  const validAgeDiffer = ageDiffer
    .filter(ageDiff =>
      ageDiff !== null
    );

  const sumAgeDiffer = validAgeDiffer
    .reduce((acc, ageDiff) => acc + ageDiff, 0);

  const averageAgeDiffer = validAgeDiffer.length > 0
    ? sumAgeDiffer / validAgeDiffer.length
    : 0;

  return +averageAgeDiffer.toFixed(2);
}

function calculateAverageAge(arr) {
  const sum = arr.reduce((acc, person) => {
    return acc + (person.died - person.born);
  }, 0);

  const average = sum / arr.length;

  return +average.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
