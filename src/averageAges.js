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
  const newPeople = people.filter(human => human.sex === 'm');
  const newPeopleLength = newPeople.filter(human =>
    Math.ceil(human['died'] / 100) === century).length;

  switch (century) {
    case undefined:
      return newPeople.reduce((acum, curnum) =>
        acum + curnum.died - curnum.born, 0) / newPeople.length;

    default:
      return newPeople.filter(human =>
        Math.ceil(human['died'] / 100) === century).reduce((acum, curnum) =>
        acum + curnum.died - curnum.born, 0) / newPeopleLength;
  }
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
  const newPeople = [...people];

  newPeople.forEach(element => {
    const motherIndex = newPeople.findIndex(elementt =>
      elementt['name'] === element['mother']);

    if (motherIndex !== -1) {
      newPeople[motherIndex]['child'] = element;
    }
  });

  let fMPeople = newPeople.filter(human => human.sex === 'f');

  if (withChildren) {
    fMPeople = fMPeople.filter(human => human['child'] !== undefined);
  }

  return fMPeople.reduce((acum, curnum) =>
    acum + curnum['died'] - curnum['born'], 0) / fMPeople.length;
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
  let children = [...people];

  children = people.filter(person => onlyWithSon
    ? people.some(mother => mother.name === person.mother && person.sex === 'm')
    : people.find(mother => mother.name === person.mother)
  );

  const ageDifference = children.map(child =>
    child.born - people.find(mother => mother.name === child.mother).born
  );

  return ageDifference.reduce((count, person) => count + person)
  / ageDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
