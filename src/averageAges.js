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

  const lifetime = (deathYear) => {
    return Math.ceil(deathYear / 100);
  };

  const men = (!century)
    ? people.filter(person => person.sex === 'm')
    : people.filter(person => (person.sex === 'm')
    && (century === lifetime(person.died)));

  const menAges = men.map(person => person.died - person.born);

  const sum = menAges.reduce((accumulator, current) => accumulator + current, 0,
  );

  return (sum / menAges.length);
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
  const women = (!withChildren)
    ? people.filter(person => person.sex === 'f')
    : people.filter(person => (person.sex === 'f')
    && (people.some(child => child.mother === person.name)));

  const womenAges = women.map(person => person.died - person.born);

  const sum = womenAges.reduce(
    (accumulator, current) => accumulator + current, 0,
  );

  return (sum / womenAges.length);
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
  const genderCheck = (!onlyWithSon) ? 0 : 1;
  let diff = [];

  switch (genderCheck) {
    case 0:
      diff = people.map(person => {
        if (person.mother !== null) {
          const motherName = person.mother;
          const mother = people.find(woman => woman.name === motherName);

          if (mother !== undefined) {
            return person.born - mother.born;
          }
        }
      });
      break;

    case 1:
      diff = people.map(person => {
        if ((person.mother !== null) && (person.sex === 'm')) {
          const motherName = person.mother;
          const mother = people.find(woman => woman.name === motherName);

          if (mother !== undefined) {
            return person.born - mother.born;
          }
        }
      });
      break;
  }

  const ages = diff.filter(el => el !== undefined);
  const sum = ages.reduce(
    (accumulator, current) => accumulator + current, 0,
  );

  return sum / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
