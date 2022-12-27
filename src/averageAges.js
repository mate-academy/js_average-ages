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
function returnAverage(array) {
  const sum = array.reduce(
    (accumulator, current) => accumulator + current, 0,
  );

  return sum / array.length;
}

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

  return returnAverage(menAges);
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

  return returnAverage(womenAges);
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
  let motherName = '';
  let mother = [];

  const diff = (!onlyWithSon)
    ? people.map(person => {
      if (person.mother !== null) {
        motherName = person.mother;
        mother = people.find(woman => woman.name === motherName);

        if (mother !== undefined) {
          return person.born - mother.born;
        }
      }
    })
    : people.map(person => {
      if ((person.mother !== null) && (person.sex === 'm')) {
        motherName = person.mother;
        mother = people.find(woman => woman.name === motherName);

        if (mother !== undefined) {
          return person.born - mother.born;
        }
      }
    });

  const ages = diff.filter(el => el !== undefined);

  return returnAverage(ages);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
