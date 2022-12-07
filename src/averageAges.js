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
  const men = people.filter(person => century
    ? isMale(person) && bornInCentury(person, century)
    : isMale(person)
  );

  const ages = men.map(calculateAge);

  return calculateAverageAge(ages);
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
  const ages = (withChildren
    ? people.filter(mother => (
      people.some(person => mother.name === person.mother)
    ))
    : people.filter(person => !isMale(person)))
    .map(calculateAge);

  return calculateAverageAge(ages);
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
  const children = people.filter(child => (onlyWithSon
    ? people.find(mother => mother.name === child.mother && isMale(child))

    : people.find(mother => mother.name === child.mother)
  ));

  const mothers = people.filter(mother =>
    (children.some(child => child.mother === mother.name)
    ));

  const difference = children.map(child => {
    const mother = mothers.find(woman => woman.name === child.mother);

    return child.born - mother.born;
  });

  return calculateAverageAge(difference);
}

function isMale(person) {
  return person.sex === 'm';
}

function bornInCentury(person, century) {
  return Math.ceil(person.died / 100) === century;
}

function calculateAge(person) {
  return person.died - person.born;
}

function calculateAverageAge(ages) {
  return ages.reduce((total, current) => total + current) / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
