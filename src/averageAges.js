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
  const allMen = people.filter(person => (
    person.sex === 'm'
    && (century ? Math.ceil(person.died / 100) === century : true)));

  return calculateAverageAge(allMen);
}

function calculateAverageAge(listOfPeople) {
  return listOfPeople.reduce((sum, a) => (
    sum + (a.died - a.born)
  ), 0) / listOfPeople.length;
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
  const allWomen = people.filter(person => person.sex === 'f');

  return withChildren
    ? calculateAverageAge(findWomenWithChildren(allWomen, people))
    : calculateAverageAge(allWomen);
}

function findWomenWithChildren(women, people) {
  return women.filter(woman => (
    people.find(person => person.mother === woman.name)));
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
  const children = people.filter(person => (
    person.mother !== null
    && (!onlyWithSon || person.sex === 'm')
  ));

  let amountOfMothers = 0;

  const sumOfAges = children.reduce((sum, person) => {
    const mother = people.find(personOfPeople => (
      personOfPeople.name === person.mother
    ));

    if (mother) {
      const diff = person.born - mother.born;

      amountOfMothers++;

      return sum + diff;
    } else {
      return sum + 0;
    }
  }, 0);

  return sumOfAges / amountOfMothers;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
