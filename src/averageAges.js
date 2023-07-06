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
  const sexMale = 'm';
  const calculateYearCentury = 100;

  const sortedPeople = century
    ? people.filter((person) =>
      checkSex(person.sex, sexMale)
      && Math.ceil(person.died / calculateYearCentury) === century
    )
    : people.filter((person) =>
      checkSex(person.sex, sexMale)
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
  const sexFemale = 'f';

  const sortedPeople = withChildren
    ? people.filter((person) =>
      checkSex(person.sex, sexFemale)
      && people.find(({ mother }) => mother === person.name)
    )
    : people.filter((person) =>
      checkSex(person.sex, sexFemale)
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
  const sexMale = 'm';
  const sexFemale = 'f';

  const peopleWithMother = onlyWithSon
    ? people.filter((person) =>
      person.mother !== null && checkSex(person.sex, sexMale)
    )
    : people.filter((person) =>
      person.mother !== null
    );

  const women = people
    .filter((person) => checkSex(person.sex, sexFemale))
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

function checkSex(personSex, checkedSex) {
  return personSex === checkedSex;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
