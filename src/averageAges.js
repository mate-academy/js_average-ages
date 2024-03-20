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
  const filteredMen = people.filter(person => person.sex === 'm'
  && (!century || Math.ceil(person.died / 100) === century)
  );
  const menAge = filteredMen.reduce(
    (sum, { died, born }) => sum + (died - born),
    0
  );

  return menAge / filteredMen.length;
};

// learn how to use array methods like .filter .map .some .every .find .reduce

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
  const filteredWomen = people.filter(person => person.sex === 'f');

  if (withChildren) {
    const womenWithChildren = filteredWomen.filter((woman) =>
      people.some((person) => person.mother === woman.name)
    );

    const totalAgeWithChildren = womenWithChildren.reduce(
      (sum, woman) => sum + (woman.died - woman.born),
      0
    );

    const averageAgeWithChildren
    = totalAgeWithChildren / womenWithChildren.length;

    return averageAgeWithChildren;
  }

  const totalAge = filteredWomen.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  const averageAge = totalAge / filteredWomen.length;

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
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value
  let peopleWithMothers = people
    .filter(person => people.some(human => human.name === person.mother));

  if (onlyWithSon) {
    peopleWithMothers = peopleWithMothers.filter(
      (child) =>
        child.sex === 'm'
        && people.some((person) => person.name === child.mother)
    );
  }

  const ageDifferences = peopleWithMothers.map(child => {
    const mother = people.find(person => person.name === child.mother);

    return child.born - mother.born;
  });

  const totalAgeDiff = ageDifferences.reduce((sum, ageDiff) =>
    sum + ageDiff, 0);
  const averageAgeDiff = totalAgeDiff / ageDifferences.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
