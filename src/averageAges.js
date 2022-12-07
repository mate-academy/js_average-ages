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
  const menInThisentury = people.filter(person => {
    const isMan = person.sex === 'm';

    return century
      ? isMan && Math.ceil(person.died / 100) === century
      : isMan;
  });

  const menAges = getAges(menInThisentury);

  return getAverage(menAges);
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
  const womenInThisentury = people.filter(person => {
    const isWoman = person.sex === 'f';

    return withChildren
      ? isWoman && people.find(child => person.name === child.mother)
      : isWoman;
  });

  const womenAges = getAges(womenInThisentury);

  return getAverage(womenAges);
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
  const kids = people.filter(person => {
    const hasMother = people.some(mother => person.mother === mother.name);
    const isBoy = person.sex === 'm';

    return (onlyWithSon)
      ? hasMother && isBoy
      : hasMother;
  });

  const agesDiff = kids.map(kid => {
    const mom = people.find(mother => kid.mother === mother.name);

    return kid.born - mom.born;
  });

  return getAverage(agesDiff);
}

const getAges = (people) => {
  return people.map(person => person.died - person.born);
};

const getAverage = (people) => {
  return people.reduce((ageA, ageB) => ageA + ageB, 0) / people.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
