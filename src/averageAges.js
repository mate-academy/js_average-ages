'use strict';

/*
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century = 0) {
  let men = people.filter(person => person.sex === 'm');

  if (century) {
    men = men.filter(person =>
      Math.ceil(person.died / 100) === century);
  };

  const sumAge = men.reduce((sum, person) =>
    sum + person.died - person.born, 0);

  return sumAge / men.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren = 0) {
  let women = people.filter(person => person.sex === 'f');

  if (withChildren) {
    women = women.filter(({ name }) => {
      return people.some(child => child.mother === name);
    });
  }

  const averegeAgeWomen = women.reduce((sum, person) =>
    person.died - person.born + sum, 0);

  return averegeAgeWomen / women.length;
}

/*
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon = 0) {
  const ages = [];
  const mothers = people.filter(person =>
    person.sex === 'f' && people.some(child => {
      return child.mother === person.name;
    }));

  mothers.forEach(mother => {
    let children;

    if (onlyWithSon) {
      children = people.filter(child =>
        child.mother === mother.name && child.sex === 'm');
    } else {
      children = people.filter(child => child.mother === mother.name);
    }
    children.forEach(child => ages.push(child.born - mother.born));
  });

  return ages.reduce((sum, age) => sum + age, 0) / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
