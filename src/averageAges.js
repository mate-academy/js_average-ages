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
const getAverageAge = (people) => {
  const sumOfAge = people.reduce((sum, person) => {
    const age = person.died - person.born;

    return sum + age;
  }, 0);

  const averageAge = sumOfAge / people.length;

  return Math.round(averageAge * 100) / 100;
};

function calculateMenAverageAge(people, century) {
  const men = people.filter((person) => {
    const isMan = person.sex === 'm';
    const isCentury = Math.ceil(person.died / 100) === century;

    return century ? isMan && isCentury : isMan;
  });

  return getAverageAge(men);
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
  const women = people.filter((person) => {
    const isWoman = person.sex === 'f';

    if (withChildren) {
      return isWoman && people.some((one) => person.name === one.mother);
    }

    return isWoman;
  });

  return getAverageAge(women);
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
  const mothersWithChildren = people.reduce((arr, person) => {
    const childrenBorn = people.filter((child) => {
      const hasMother = person.name === child.mother;

      return onlyWithSon ? child.sex === 'm' && hasMother : hasMother;
    }).map((child) => child.born);

    if (!childrenBorn.length) {
      return arr;
    }

    return [...arr, {
      motherBorn: person.born,
      childrenBorn,
    }];
  }, []);

  const ages = mothersWithChildren.reduce((arrAges, mother) => {
    const agesDiff = mother.childrenBorn.map(
      (born) => born - mother.motherBorn);

    return [...arrAges, ...agesDiff];
  }, []);

  const averageAge = ages.reduce((sum, age) => sum + age, 0) / ages.length;

  return Math.round(averageAge * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
