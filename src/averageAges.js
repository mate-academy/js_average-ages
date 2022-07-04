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
  let count = 0;
  let sumAges = 0;

  for (const { sex, died, born } of people) {
    const personCentury = Math.ceil(died / 100);

    if (sex === 'm' && personCentury === (century || personCentury)) {
      sumAges += (died - born);
      count++;
    }
  }

  return sumAges / count;
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
  let count = 0;
  let sumAges = 0;
  const mothers = [];

  for (const { mother } of people) {
    if (mother !== null) {
      mothers.push(mother);
    }
  }

  for (const { name, sex, died, born } of people) {
    let person;

    if (withChildren !== undefined && mothers.includes(name)) {
      person = name;
    } else if (withChildren === undefined && sex === 'f') {
      person = name;
    }

    if (person !== undefined) {
      sumAges += (died - born);
      count++;
    }
  }

  return sumAges / count;
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
  let children = people.filter(({ mother }) =>
    people.find(({ name }) => name === mother));

  if (onlyWithSon) {
    children = children.filter(({ sex }) => sex === 'm');
  }

  return children.reduce((prev, { born, mother }) =>
    prev + born - people.find(({ name }) =>
      mother === name).born, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
