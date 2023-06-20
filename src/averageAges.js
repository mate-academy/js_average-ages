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
  const menArr = people.filter(person =>
    person.sex === 'm'
    && (century
      ? Math.ceil(person.died / 100) === century
      : true)
  );

  return calculateAverageAge(menArr);
}

function calculateAverageAge(people) {
  return people.reduce((acc, cur) => {
    return acc + (cur.died - cur.born);
  }, 0) / people.length;
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
  const womenArr = people.filter(person =>
    person.sex === 'f'
    && (withChildren
      ? people.some(item => item.mother === person.name)
      : true)
  );

  return calculateAverageAge(womenArr);
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
  const childrenArr = people.filter(person =>
    people.find(child => child.name === person.mother)
    && (!onlyWithSon || (person.sex === 'm' && people
      .find(child => child.name === person.mother)))
  );

  const mothers = people.filter(person =>
    person.sex === 'f'
    && (!onlyWithSon || people.find(mum => mum.mother === person.name))
  );

  const diff = childrenArr.reduce((acc, cur) =>
    acc + (cur.born - mothers
      .find(mommy => mommy.name === cur.mother).born), 0
  ) / childrenArr.length;

  return diff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
