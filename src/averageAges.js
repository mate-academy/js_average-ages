'use strict';

const averageAge = (sumAges, person) => {
  const age = person.died - person.born;

  return sumAges + age;
};

function calculateMenAverageAge(people, century) {
  const onlyMen = people.filter(
    person => century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  );

  return onlyMen.reduce(averageAge, 0) / onlyMen.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 */
function calculateWomenAverageAge(people, withChildren) {
  const onlyWomen = people.filter(
    person => withChildren
      ? people.some(human => person.name === human.mother)
      : person.sex === 'f'
  );

  return onlyWomen.reduce(averageAge, 0) / onlyWomen.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const childern = people.filter(
    person => onlyWithSon
      ? people.some(
        child => child.name === person.mother && person.sex === 'm'
      )
      : people.some(mother => mother.name === person.mother)
  );

  const ages = childern.map(
    child => child.born - people
      .find(mother => mother.name === child.mother).born);

  return ages.reduce((sum, age) => sum + age) / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
