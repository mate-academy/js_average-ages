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
  const men = people.filter(person =>
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  );

  const resultAge = men.map(function(person) {
    person.age = person.died - person.born;

    return person;
  });

  const callback = (sum, x) => {
    const result = sum + x.age;

    return result;
  };

  const sumAge = resultAge.reduce(callback, 0);
  const finalResult = +((sumAge / resultAge.length).toFixed(2));

  return finalResult;
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
  let filterWomen;

  withChildren ? (
    filterWomen = people.filter(person => person.sex === 'f'
    && people.some((child) => child.mother === person.name))
  ) : (
    filterWomen = people.filter(person => person.sex === 'f')
  );

  const resultAge = filterWomen.map(function(person) {
    person.age = person.died - person.born;

    return person;
  });

  const callback = (sum, x) => {
    const result = sum + x.age;

    return result;
  };

  const sumAge = resultAge.reduce(callback, 0);
  const finalResult = +((sumAge / resultAge.length).toFixed(2));

  return finalResult;
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
  const filterChild = people.filter(child =>
    onlyWithSon ? (
      people.find(mother => mother.name === child.mother) && child.sex === 'm'
    ) : (
      people.find(mother => mother.name === child.mother)
    )
  );

  const arrAges = filterChild.map(function(child) {
    const motherBorn = people.find(mother => mother.name === child.mother).born;
    const diff = child.born - motherBorn;

    return diff;
  });

  const callback = (sum, x) => {
    const result = sum + x;

    return result;
  };

  const sumAge = arrAges.reduce(callback, 0);
  const finalResult = +((sumAge / arrAges.length).toFixed(2));

  return finalResult;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
