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
  const filteredMen = people.filter(person =>
    person.sex === 'm'
     && (!century || century === Math.ceil(person.died / 100)));

  const filteredMenAge = filteredMen.map(year => year.died - year.born);

  const result = filteredMenAge.reduce((a, b) => a + b) / filteredMenAge.length;

  return result;
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
  const motherListUnique = people.map(woman => woman.mother)
    .filter((name, i, arr) => arr.indexOf(name) === i);

  const filteredWomen = people.filter(person =>
    person.sex === 'f' && (!withChildren
      || motherListUnique.includes(person.name)));

  const filteredWomenAge = filteredWomen.map(year => year.died - year.born);

  const result = filteredWomenAge.reduce((a, b) =>
    a + b) / filteredWomenAge.length;

  return result;
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
  const childBornDate = [];
  const motherBornDate = [];
  const onlyWomen = people.filter(woman => woman.sex === 'f');
  let childrens = [];

  if (onlyWithSon) {
    childrens = people.filter(person => person.sex === 'm');
  } else {
    childrens = people;
  }

  childrens.forEach(child => {
    const mother = onlyWomen.find(woman => child.mother === woman.name);

    if (mother) {
      childBornDate.push(child.born);
      motherBornDate.push(mother.born);
    }
  }
  );

  const averageChild = childBornDate.reduce((a, b) =>
    a + b) / childBornDate.length;
  const averageMother = motherBornDate.reduce((a, b) =>
    a + b) / motherBornDate.length;

  const result = averageChild - averageMother;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
