'use strict';

/**
 * Function returns average age of men in array.
 *
 * @param {object[]} people array of people.
 * @param {number=} [century] if this parameter is speficied then the
 * function calculates average age only for men who died in this century.
 *
 * @return {number} the average age of men.
 */
function calculateMenAverageAge(people, century) {
  const men = !century
    ? people.filter(person => person.sex === 'm')
    : people
      .filter(person => person.sex === 'm')
      .filter(person => Math.ceil(person.died / 100) === century);

  const result = men
    .map(person => person.died - person.born)
    .reduce((accumulator, current) => accumulator + current) / men.length;

  return result;
}

/**
 * Function returns average age of women in array.
 *
 * @param {object[]} people array of people.
 * @param {boolean=} [withChildren] - if this parameter is speficied then
 * the function calculates average age only for women with children.
 *
 * @return {number} the average age of women.
 */
function calculateWomenAverageAge(people, withChildren) {
  const allWomen = people.filter(person => person.sex === 'f');
  const mothers = allWomen
    .filter(person => people
      .findIndex(element => element.mother === person.name) !== -1);

  const result = !withChildren
    ? allWomen
      .map(person => person.died - person.born)
      .reduce((accumulator, current) => accumulator + current) / allWomen.length
    : mothers
      .map(person => person.died - person.born)
      .reduce((accumulator, current) => accumulator + current) / mothers.length;

  return result;
}

/**
 * The function returns an average age difference between a mother and her
 * child in the array (a mother's age at child birth).
 *
 * @param {object[]} people array of people.
 * @param {boolean=} [onlyWithSon] if this parameter is speficied then
 * the function calculates age difference only for mothers who have son.
 *
 * @return {number} the average age difference.
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = people
    .filter(person => person.sex === 'f')
    .filter(person => people
      .findIndex(element => element.mother === person.name) !== -1);
  const allChildren = people
    .filter(person => mothers
      .findIndex(element => element.name === person.mother) !== -1);

  const mothersWithSons = mothers
    .filter(person => people
      .findIndex(element => element.mother === person.name
      && element.sex === 'm') !== -1);
  const sons = people
    .filter(person => mothersWithSons
      .findIndex(element => element.name === person.mother) !== -1)
    .filter(person => person.sex === 'm');

  const result = !onlyWithSon
    ? allChildren
      .map(child => {
        const motherBorn = mothers
          .find(mother => mother.name === child.mother).born;

        return child.born - motherBorn;
      })
      .reduce((accumulator, current) => accumulator + current)
        / allChildren.length
    : sons
      .map(child => {
        const motherBorn = mothersWithSons
          .find(mother => mother.name === child.mother).born;

        return child.born - motherBorn;
      })
      .reduce((accumulator, current) => accumulator + current) / sons.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
