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
  const filterCallback = century
    ? (man) => (man.sex === 'm' && Math.ceil(man.died / 100) === century)
    : (man) => (man.sex === 'm');

  const mensList = people.filter(filterCallback);

  const mensAge = mensList.map(man => man.died - man.born
  ).reduce((a, b) => a + b);

  return mensAge / mensList.length;
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
  const womansList = people.filter(human => human.sex === 'f'
    && (!withChildren || people.find(child => child.mother === human.name)
    )
  );

  const womansAge = womansList.map(woman => woman.died - woman.born
  ).reduce((a, b) => a + b);

  return womansAge / womansList.length;
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
  const children = people.filter(
    child => people.find(
      mother => mother.name === child.mother
    ) && (!onlyWithSon || child.sex === 'm')
  );

  const yourMother = (hisName) => people.find(
    (mother) => (hisName === mother.name)
  );

  const age = children.reduce(
    (acc, child) => acc + child.born - yourMother(child.mother).born, 0
  );

  return age / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
