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
  const sortedPeople = century
    ? people.filter((person) =>
      person.sex === 'm' && Math.ceil(person.died / 100) === century
    )
    : people.filter((person) =>
      person.sex === 'm'
    );

  const averageAge = getAverageAge(sortedPeople);

  return averageAge;
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
  const sortedPeople = withChildren
    ? people.filter((person) =>
      person.sex === 'f'
      && people.find(({ mother }) => mother === person.name)
    )
    : people.filter((person) =>
      person.sex === 'f'
    );

  const averageAge = getAverageAge(sortedPeople);

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
  const peopleWithMother = onlyWithSon
    ? people.filter((person) =>
      person.mother !== null && person.sex === 'm'
    )
    : people.filter((person) =>
      person.mother !== null
    );

  const women = people
    .filter((person) => person.sex === 'f')
    .map(person => person.name);

  const peopleWithExistMother = peopleWithMother
    .filter((person) => women.includes(person.mother));

  const averageAge = peopleWithExistMother
    .reduce((prev, person) => {
      const mother = people.find((personsMother) =>
        personsMother.name === person.mother);

      return prev + (person.born - mother.born);
    }, 0) / peopleWithExistMother.length;

  return averageAge;
}

function getAverageAge(sortedPeople) {
  return sortedPeople
    .reduce((prev, { born, died }) => {
      return prev + died - born;
    }, 0) / sortedPeople.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
