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
  let men;

  if (century) {
    men = people.filter((person) =>
      person.sex === 'm' && Math.ceil(person.died / 100) === century);
  } else {
    men = people.filter((person) => person.sex === 'm');
  }

  const ages = men.map((year) => year.died - year.born);
  const ageSum = ages.reduce((sum, age) => sum + age, 0);
  const averageAge = ageSum / ages.length;

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
  let women;

  if (withChildren) {
    women = people.filter((person) =>
      person.sex === 'f' && people.some(otherPerson =>
        otherPerson.mother === person.name));
  } else {
    women = people.filter((person) => person.sex === 'f');
  }

  const womenAges = women.map((year) => year.died - year.born);
  const ageSum = womenAges.reduce((sum, age) => sum + age, 0);
  const averageAge = ageSum / womenAges.length;

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
  const children = people.filter(person => (
    person.mother !== null && people.find(human => human.name === person.mother)
  ),
  );

  if (onlyWithSon) {
    const getSon = children.filter(person => person.sex === 'm');
    const getAverage = getSon.map(person => {
      const mother = people.find(hum => person.mother === hum.name);
      const diffAge = person.born - mother.born;

      return diffAge;
    });

    const ageSum = getAverage.reduce((sum, age) => sum + age, 0);
    const averageAge = ageSum / getAverage.length;

    return averageAge;
  } else {
    const getAverage = children.map(person => {
      const mother = people.find(hum => person.mother === hum.name);
      const diffAge = person.born - mother.born;

      return diffAge;
    });

    const ageSum = getAverage.reduce((sum, age) => sum + age, 0);
    const averageAge = ageSum / getAverage.length;

    return averageAge;
  }
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
