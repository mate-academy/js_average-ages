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
 *
 *
 */

const calculateAverageAge = (peopleArray) => {
  return peopleArray
    .reduce((years, person) => (
      years + person.died - person.born
    ), 0) / peopleArray.length || 0;
};

const calculateMenAverageAge = (people, century) => {
  const menList = people.filter(person =>
    (person.sex === 'm' && (century
      ? Math.ceil(person.died / 100) === century
      : true)
    ));

  return calculateAverageAge(menList);
};

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
  const womanList = people
    .filter(person =>
      (person.sex === 'f' && (withChildren
        ? people.some(child => child.mother === person.name)
        : true)
      ));

  return calculateAverageAge(womanList);
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

  const peopleWithMother = people.filter(person =>
    ((people.some(child => child.name === person.mother)
    && (onlyWithSon
      ? person.sex === 'm'
      : true)
    ))
  );

  const mothersYears = peopleWithMother.map(person =>
    ({
      died: person.born,
      born: people.find(mother => person.mother === mother.name).born,
    })
  );

  return calculateAverageAge(mothersYears);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
