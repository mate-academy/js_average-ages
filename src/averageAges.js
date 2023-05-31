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
  const filteredMen = people.filter(
    person => (
      person.sex === 'm' && (century
        ? Math.ceil(person.died / 100) === century
        : true)
    ));

  const ages = filteredMen.map(person => person.died - person.born);
  const averageAge = getAverageAge(ages, filteredMen.length);

  return averageAge;
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
  const filteredWomen = people.filter(person => {
    if (withChildren) {
      return people.some(
        child => child.mother === person.name) && person.sex === 'f';
    } else {
      return person.sex === 'f';
    }
  });

  const ages = filteredWomen.map(person => person.died - person.born);
  const averageAge = getAverageAge(ages, filteredWomen.length);

  return averageAge;
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
  const children = people.filter(person => (
    people.find(mother => mother.name === person.mother) && (onlyWithSon
      ? person.sex === 'm'
      : true)
  ));

  const ageDifferences = children.map(child => {
    const mother = people.find(person => person.name === child.mother);

    return child.born - mother.born;
  }
  );

  return getAverageAge(ageDifferences, children.length);
}

function getAverageAge(ages, amountOfPeople) {
  return amountOfPeople
    ? ages.reduce((sum, age) => sum + age, 0) / amountOfPeople
    : 0;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
