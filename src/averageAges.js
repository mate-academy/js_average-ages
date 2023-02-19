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
const callbackReduce = (sum, { died, born }) => sum + (died - born);
const isGender = (person, gender) => person.sex === gender;

function calculateMenAverageAge(people, century) {
  const men = people.filter(({ sex, died }) => {
    return sex === 'm' && (!century || Math.ceil(died / 100) === century);
  });

  const age = men.reduce(callbackReduce, 0);

  return age / men.length;
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
  const women = people.filter(person =>
    withChildren ? (
      people.find(mother => mother.mother === person.name)
      && isGender(person, 'f')
    ) : isGender(person, 'f')
  );
  const age = women.reduce(callbackReduce, 0);

  return age / women.length;
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
  const childrensName = people.filter(child =>
    onlyWithSon ? (
      people.find(mother => mother.name === child.mother)
      && isGender(child, 'm')
    ) : (
      people.find(mother => mother.name === child.mother)
    )
  );

  const arrAges = childrensName.map(child =>
    child.born - people.find(mother => mother.name === child.mother).born
  );

  return arrAges.reduce((sum, item) => sum + item) / arrAges.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
