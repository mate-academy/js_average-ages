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
  const arrayMen = people.filter(el => el.sex === 'm');

  if (!century) {
    return +(arrayMen.map((el) => el.died - el.born)
      .reduce((acc, el) => acc + el) / arrayMen.length).toFixed(2);
  }

  const arrayMenByCentiry = arrayMen
    .filter(el => Math.ceil(el.died / 100) === century);

  return +(arrayMenByCentiry.map(el => el.died - el.born)
    .reduce((acc, el) => acc + el) / arrayMenByCentiry.length).toFixed(2);
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
  const womenArray = people.filter(el => el.sex === 'f');

  if (!withChildren) {
    return +(womenArray.map(el => el.died - el.born)
      .reduce((acc, el) => acc + el, 0) / womenArray.length).toFixed(2);
  }

  const womenWithChildren = womenArray.filter((el) => people
    .filter(person => el.name === person.mother).length > 0);

  return +(womenWithChildren
    .map(el => el.died - el.born)
    .reduce((acc, el) => acc + el) / womenWithChildren.length).toFixed(2);
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
  const arrayPeopleWithMother = people.filter(el => people
    .filter(person => person.name === el.mother).length > 0);

  if (!onlyWithSon) {
    const withoutSon = arrayPeopleWithMother.map(el => {
      const mother = people.filter(person => person.name === el.mother)[0];

      return el.born - mother.born;
    });

    return +(withoutSon
      .reduce((acc, el) => acc + el) / withoutSon.length).toFixed(2);
  }

  const withSon = arrayPeopleWithMother.filter(el => el.sex === 'm').map(el => {
    const mother = people.filter(person => person.name === el.mother)[0];

    return el.born - mother.born;
  });

  return +(withSon.reduce((acc, el) => acc + el) / withSon.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
