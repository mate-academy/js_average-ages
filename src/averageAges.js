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
  const SEX = 'm';
  const CENTURY_DIVIDE = 100;

  let men = people.filter(person => person.sex === SEX);

  if (century) {
    men = men.filter(man => {
      return Math.ceil(man.died / CENTURY_DIVIDE) === century;
    });
  };

  const sumAge = men.reduce((acc, man) => {
    return acc + (man.died - man.born);
  }, 0);

  return countAverageAge(sumAge, men.length);
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
  const SEX = 'f';
  const personsWithMother = [];

  let women = people.filter(person => person.sex === SEX);

  if (withChildren) {
    people.forEach(person => {
      if (person.mother && !personsWithMother.includes(person.mother)) {
        personsWithMother.push(person.mother);
      }
    });

    women = women.filter(woman => {
      if (personsWithMother.includes(woman.name)) {
        return woman;
      }
    });
  }

  const sumAge = women.reduce((acc, woman) => {
    return acc + (woman.died - woman.born);
  }, 0);

  return countAverageAge(sumAge, women.length);
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
  let persons = people;
  const personsWithMother = [];
  let sumAgeDifference = 0;
  const SEX = 'm';

  if (onlyWithSon === true) {
    persons = persons.filter(person => person.sex === SEX);
  }

  persons.forEach(person => {
    if (person.mother) {
      const mother = people.find(motherItem => {
        return motherItem.name === person.mother;
      });

      if (mother) {
        personsWithMother.push({
          child: person,
          mother,
        });
      }
    }
  });

  personsWithMother.forEach(family => {
    sumAgeDifference += family.child.born - family.mother.born;
  });

  return countAverageAge(sumAgeDifference, personsWithMother.length);
}

function countAverageAge(sumAges, itemsLength) {
  return +(sumAges / itemsLength).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
