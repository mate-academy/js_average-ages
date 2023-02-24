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
const totalYears = person => person.died - person.born;

const averageAge = (ages) => {
  const sumOfAges = ages.reduce((sum, age) => sum + age, 0);

  return sumOfAges / ages.length;
};

function calculateMenAverageAge(people, century) {
  const mans = people.filter(person => person.sex === 'm');

  const manAverage = century ? mans.reduce((diedCetury, person) => {
    if (Math.ceil(person.died / 100) === century) {
      diedCetury.push(totalYears(person));
    }

    return diedCetury;
  }, [])
    : mans.reduce((died, person) => {
      died.push(totalYears(person));

      return died;
    }, []);

  return averageAge(manAverage);
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
  const women = people.filter(person => withChildren
    ? people.some(child => child.mother === person.name)
    : person.sex === 'f'
  );

  const sumAges = women
    .reduce((sum, age) => sum + totalYears(age), 0)
    / women.length;

  return sumAges;
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
  const peopleWithMother = people.filter(person => people.some(mother => (
    onlyWithSon
      ? person.sex === 'm' && mother.name === person.mother
      : mother.name === person.mother
  )));

  const ageDifference = peopleWithMother.map((person) => {
    const personMother = people.find(mother => mother.name === person.mother);

    return person.born - personMother.born;
  });

  return averageAge(ageDifference);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
