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
    ? checkPersonSex(person, 'm')
      && Math.ceil(person.died / 100) === century
    : checkPersonSex(person, 'm'));

  const agesSum = men
    .reduce((sum, man) => sum + man.died - man.born, 0);

  return agesSum / men.length;
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
    ? checkPersonSex(person, 'f')
      && people.some(child => checkMotherhood(person, child))
    : checkPersonSex(person, 'f')
  );

  const agesSum = women
    .reduce((sum, woman) => sum + woman.died - woman.born, 0);

  return agesSum / women.length;
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
  const children = people
    .filter(person => onlyWithSon
      ? people.some(mama => checkMotherhood(mama, person))
        && checkPersonSex(person, 'm')
      : people.some(mama => checkMotherhood(mama, person)));

  const ageDifference = children
    .reduce((ageSum, child) => ageSum + (child.born - people
      .find(mama => checkMotherhood(mama, child)).born), 0
    );

  return ageDifference / children.length;
}

const checkMotherhood = ({ name }, { mother }) => {
  return name === mother;
};

const checkPersonSex = ({ sex }, requiredSex) => {
  return sex === requiredSex;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
