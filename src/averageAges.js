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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting

  const filtered = people.filter(person => {
    return !century
      ? person.sex === 'm'
      : Math.ceil(person.died / 100) === century && person.sex === 'm';
  });

  const sumOfAges = filtered.reduce(
    (a, b) => a + (b.died - b.born),
    0,
  );

  return sumOfAges / filtered.length;
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
  // write code here
  const filtered = people.filter(person => {
    return !withChildren
      ? person.sex === 'f'
      : people.find(el => el.mother === person.name);
  });

  const sumOfAges = filtered.reduce(
    (a, b) => a + (b.died - b.born),
    0,
  );

  return sumOfAges / filtered.length;
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
  const result = [];

  const getMotherAge = (motherName) => {
    let wasBorn;

    people.find(mother => {
      if (mother.name === motherName) {
        wasBorn = mother.born;
      }
    });

    return wasBorn;
  };

  const sons = people.filter(person => person.sex === 'm');

  let filtered;

  onlyWithSon
    ? filtered = sons
    : filtered = people;

  filtered.map(person => {
    const motherBurnDate = getMotherAge(person.mother);

    return motherBurnDate !== undefined
      ? result.push(Math.abs(motherBurnDate - person.born))
      : undefined;
  });

  const sumOfAges = result.reduce(
    (a, b) => a + b,
    0,
  );

  return sumOfAges / result.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
