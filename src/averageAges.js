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
  let men = people.filter(({ sex }) => sex === 'm');

  if (century) {
    men = men.filter(({ died }) => Math.ceil(died / 100) === century);
  }

  const yearsLived = men.map(({ died, born }) => died - born);

  const menAverageAge = yearsLived.reduce((generalAge, age) => {
    return generalAge + age;
  });

  return menAverageAge / yearsLived.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let women = people.filter(({ sex }) => sex === 'f');

  if (withChildren) {
    const mothers = people.map(({ mother }) => mother);

    women = women.filter(({ name }) => {
      return mothers.includes(name);
    });
  }

  const yearsLived = women.map(({ died, born }) => died - born);

  const womenAverageAge = yearsLived.reduce((generalAge, age) => {
    return generalAge + age;
  });

  return womenAverageAge / yearsLived.length;
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
  const allMothers = people.map(({ mother }) => mother);

  const mothers = people.filter(({ name }) => allMothers.includes(name));

  const mothersName = mothers.map(({ name }) => name);

  let childrens = people.filter(({ mother }) => mothersName.includes(mother));

  if (onlyWithSon) {
    childrens = childrens.filter(({ sex }) => sex === 'm');
  }

  const mothersKey = mothers.reduce((acc, file, index) => {
    acc[file.name] = file;

    return acc;
  }, {});

  const ageDifference = childrens.map(children => {
    return children.born - mothersKey[children.mother].born;
  });

  const averageAge = ageDifference.reduce((prev, item) => prev + item);

  return averageAge / ageDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
