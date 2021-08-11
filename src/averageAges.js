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
  const filteredMans = century !== undefined
    ? people.filter((person) => {
      return (Math.ceil(person.died / 100) === century) && (person.sex === 'm');
    })

    : people.filter((person) => {
      return (person.sex === 'm');
    });

  const numberOfMans = filteredMans.length;

  const ages = filteredMans.map((person) => person.died - person.born);

  function averageAgeCalculator(sum, age) {
    return sum + age;
  }

  const sumOfAges = ages.reduce(averageAgeCalculator, 0);

  return sumOfAges / numberOfMans;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const filteredWomen = withChildren !== undefined
    ? people.filter((woman) => {
      return people.some((person) => {
        return person.mother === woman.name;
      });
    })

    : people.filter((person) => {
      return (person.sex === 'f');
    });

  const numberOfWomen = filteredWomen.length;

  const ages = filteredWomen.map((person) => person.died - person.born);

  function averageAgeCalculator(sum, age) {
    return sum + age;
  }

  const sumOfAges = ages.reduce(averageAgeCalculator, 0);

  return sumOfAges / numberOfWomen;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const childrenMotherAges = [];
  const sonsMotherAges = [];

  onlyWithSon !== undefined
    ? people.filter((child) => {
      people.some((mom) => {
        if (mom.name === child.mother && child.sex === 'm') {
          sonsMotherAges.push(child.born - mom.born);
        }
      });
    })

    : people.filter((child) => {
      people.some((mom) => {
        if (mom.name === child.mother) {
          childrenMotherAges.push(child.born - mom.born);
        };
      });
    });

  const ages = onlyWithSon !== undefined
    ? sonsMotherAges
    : childrenMotherAges;

  const numberOfMothers = ages.length;

  function averageAgeCalculator(sum, age) {
    return sum + age;
  }

  const sumOfAges = ages.reduce(averageAgeCalculator, 0);

  return sumOfAges / numberOfMothers;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
