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
  let mans = people.filter(person => person.sex === 'm');

  if (century !== undefined) {
    mans = mans.filter(man => Math.ceil(man.died / 100) === century);
  }

  const mansCount = mans.length;

  if (mansCount === 0) {
    return 0;
  }

  const sumAge = mans.reduce((sum, man) => sum + (man.died - man.born), 0);

  return sumAge / mansCount;

  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  let women = people.filter(person => person.sex === 'f');

  if (withChildren) {
    women = women.filter(
      mother => people.find(
        child => child.mother === mother.name
      )
    );
  }

  const womenCount = women.length;

  if (womenCount === 0) {
    return 0;
  }

  const sumAge = women.reduce(
    (sum, woman) => sum + (woman.died - woman.born),
    0);

  return sumAge / womenCount;
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
  let agesDiferences = people.map(
    person => {
      const personMother = people.find(mother => {
        return person.mother === mother.name && (
          onlyWithSon ? person.sex === 'm' : true
        );
      });

      if (personMother !== undefined) {
        return person.born - personMother.born;
      }
    }
  );

  agesDiferences = agesDiferences.filter(agesDifference => {
    return agesDifference !== undefined;
  });

  const agesDiferencesCount = agesDiferences.length;

  if (agesDiferencesCount === 0) {
    return 0;
  }

  const sumAgesDifferences = agesDiferences.reduce(
    (sum, agesDiference) => sum + agesDiference, 0
  );

  return sumAgesDifferences / agesDiferencesCount;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
