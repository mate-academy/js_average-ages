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
  const menFilter = (person) => {
    return (person.sex === 'm')
      && ((century) ? (Math.ceil(person.died / 100) === century) : 1);
  };
  const men = people.filter(menFilter);

  const totalAge = men.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  return totalAge / men.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
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
  const womenAges = people.reduce((ages, person) => {
    if (person.sex === 'f') {
      ages[person.name] = person.died - person.born;
    }

    return ages;
  }, {});

  const getMothersAverageAge = () => {
    let motherCounter = 0;
    const motherTotalAge = people.reduce((totalAges, person) => {
      if (person.mother in womenAges) {
        const age = womenAges[person.mother];

        delete womenAges[person.mother];
        motherCounter += 1;

        return totalAges + age;
      }

      return totalAges;
    }, 0);

    return motherTotalAge / motherCounter;
  };

  const getWomenAverageAge = () => {
    const womanNames = Object.keys(womenAges);

    return womanNames.reduce((sum, name) =>
      sum + womenAges[name], 0) / womanNames.length;
  };

  return withChildren ? getMothersAverageAge() : getWomenAverageAge();
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
  const womenBorn = people.reduce((relations, person) => {
    if (person.sex === 'f') {
      relations[person.name] = person.born;
    }

    return relations;
  }, {});

  let agesDiffCounter = 0;
  const motherTotalDiff = people.reduce((totalDiff, person) => {
    if (((onlyWithSon && person.sex === 'm') || !onlyWithSon)
      && (person.mother in womenBorn)) {
      const born = womenBorn[person.mother];

      agesDiffCounter += 1;

      return totalDiff + (person.born - born);
    }

    return totalDiff;
  }, 0);

  return motherTotalDiff / agesDiffCounter;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
