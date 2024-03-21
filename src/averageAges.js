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
  const men = people.filter((person) => {
    return (
      person.sex === 'm'
      && (!century || Math.ceil(person.died / 100) === century)
    );
  });

  const totalAge = men.reduce(
    (acc, person) => acc + (person.died - person.born),
    0
  );

  const amount = men.length;
  const result = totalAge / amount;

  return result;
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
  const women = people.filter(
    (person) =>
      person.sex === 'f'
      && (!withChildren || people.some((child) => child.mother === person.name))
  );

  const totalAge = women.reduce(
    (acc, person) => acc + (person.died - person.born),
    0
  );
  const amount = women.length;
  const result = totalAge / amount;

  return result;
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
  const diffs = [];
  const findOnlyWithSon = () => {
    return people.filter((ch) => ch.sex === 'm');
  };

  const newPeople = onlyWithSon ? findOnlyWithSon() : people;

  newPeople.forEach((person) => {
    const mother = people.find((obj) => obj.name === person.mother);

    if (mother) {
      diffs.push(person.born - mother.born);
    }
  });

  const sum = diffs.reduce((acc, val) => acc + val, 0);
  const avgDiff = sum / diffs.length;
  const result = +avgDiff.toFixed(2);

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
