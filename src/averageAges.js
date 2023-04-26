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
function calculateMenAverageAge(people, century = null) {
  const menList = people.filter(person => {
    return century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm';
  });

  const avgAge = menList.reduce((sumAges, person) => {
    const { born: bornYear, died: diedYear } = person;

    return sumAges + diedYear - bornYear;
  }, 0) / menList.length;

  return avgAge;
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
function calculateWomenAverageAge(people, withChildren = false) {
  const womenList = people.filter(person => {
    return withChildren
      ? person.sex === 'f' && people.some(child => child.mother === person.name)
      : person.sex === 'f';
  });

  const avgAge = womenList.reduce((sumAges, person) => {
    const { born: bornYear, died: diedYear } = person;

    return sumAges + diedYear - bornYear;
  }, 0) / womenList.length;

  return avgAge;
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const mothers = people.filter(person => {
    return people.some(child => child.mother === person.name);
  });

  const children = people.filter(child => {
    return people.some(mother => {
      return onlyWithSon
        ? (child.mother === mother.name) && child.sex === 'm'
        : (child.mother === mother.name);
    });
  });

  const childrenWithMothers = children.reduce((acc, child) => {
    const mother = mothers.find(person => person.name === child.mother);

    return [
      ...acc,
      {
        ...child,
        mother,
      },
    ];
  }, []);

  const avgAgeDiff = childrenWithMothers.reduce((sumAges, child) => {
    const { mother, born: childBornYear } = child;
    const { born: motherBornYear } = mother;

    const ages = childBornYear - motherBornYear;

    return sumAges + ages;
  }, 0) / childrenWithMothers.length;

  return avgAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
