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
  const malesOnly = century
    ? people.filter(man => man.sex === 'm')
      .filter(man => Math.ceil(man.died / 100) === century)
    : people.filter(man => man.sex === 'm');
  const malesAge = malesOnly.reduce((sumAge, male) => {
    return sumAge + male.died - male.born;
  }, 0);

  return malesAge / malesOnly.length;
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
  const filteredPeople = withChildren
    ? people.filter(man => man.sex === 'f')
      .filter(mother => people
        .find(children => mother.name === children.mother))
    : people.filter(man => man.sex === 'f');
  const sumAge = filteredPeople.reduce((sum, female) => {
    return sum + female.died - female.born;
  }, 0);

  return sumAge / filteredPeople.length;
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
  const femalesOnly = people.filter(man => man.sex === 'f');
  const mothersOnly = femalesOnly
    .filter(mother => people
      .find(children => mother.name === children.mother));
  const motherOfSunsOnly = femalesOnly
    .filter(mother => people
      .find(children => {
        return mother.name === children.mother && children.sex === 'm';
      }));
  const childrenOnly = people
    .filter(man => mothersOnly
      .find(mother => man.mother === mother.name));
  const sonsOnly = people
    .filter(man => mothersOnly
      .find(mother => man.mother === mother.name && man.sex === 'm'));
  const mothersList = onlyWithSon ? motherOfSunsOnly : mothersOnly;
  const childrenList = onlyWithSon ? sonsOnly : childrenOnly;
  const ageList = childrenList
    .map(children => children.born - mothersList
      .find(mother => mother.name === children.mother).born);
  const sumAge = ageList.reduce((sum, age) => sum + age);

  return sumAge / ageList.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
