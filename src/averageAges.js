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
  function filterMenByCentury() {
    return century ? onlyMen.filter(man => Math.ceil(
      man.died / 100) === century) : onlyMen;
  }

  const onlyMen = people.filter(man => man.sex === 'm');
  const menFiltered = filterMenByCentury(onlyMen, century);

  return +(menFiltered.reduce((sum, obj) => sum + (obj.died - obj.born), 0)
  / menFiltered.length).toFixed(2);
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(woman => woman.sex === 'f');
  const womenFiltered = withChildren
    ? women.filter(woman => people.some(({ mother }) => woman.name === mother))
    : women;

  return +(womenFiltered.reduce((sum, obj) => sum + (obj.died - obj.born), 0)
    / womenFiltered.length).toFixed(2);
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
  const filteredPeople = onlyWithSon ? people.filter(person =>
    person.sex === 'm') : people;

  const children = filteredPeople.filter(child => people.some(mother =>
    mother.name === child.mother));

  const womenWithChildren = children.map(child =>
    [child, people.find(mother => mother.name === child.mother)]);

  const sum = womenWithChildren.reduce((acc, [child, mother]) =>
    acc + child.born - mother.born, 0);

  return sum / womenWithChildren.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
