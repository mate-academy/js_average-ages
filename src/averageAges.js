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

// Shared Functions
const age = (timePeriod) =>
  timePeriod.map(person =>
    person.died - person.born)
    .reduce((a, b) => a + b, 0)
      / timePeriod.length;

const round = (num) => Math.round(num * 100) / 100;

// Main functions

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm');
  const menOfCentury = men.filter(man =>
    (Math.ceil(man.died / 100))
    === century);

  return (century ? round(age(menOfCentury)) : round(age(men)));
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
  // write code here
  const mothersNames = people.map(person => person.mother);
  const women = people.filter(person => {
    return withChildren
      ? person.sex === 'f' && mothersNames.includes(person.name)
      : person.sex === 'f';
  }
  );

  return (round(age(women)));
};
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
  // write code here
  const children = people.filter(person =>
    onlyWithSon
      ? people.find(mother => mother.name === person.mother)
       && person.sex === 'm'
      : people.find(mother => mother.name === person.mother)
  );

  const ageDifferences = children.reduce((ageSum, child) => {
    const motherBorn = people.find(mother => mother.name === child.mother).born;

    return ageSum + (child.born - motherBorn);
  }, 0);

  return ageDifferences / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
