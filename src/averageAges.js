'use strict';

const averageAge = (array, count) => {
  if (!count) {
    return +(array.map(el => el.died - el.born)
      .reduce((acc, el) => acc + el) / array.length).toFixed(2);
  }

  return +(array.reduce((acc, el) => acc + el) / array.length).toFixed(2);
};

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

  const arrayMenByCentury = arrayMen
    .filter(el => Math.ceil(el.died / 100) === century);

  return averageAge(arrayMenByCentury);
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

  return averageAge(womenWithChildren);
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
  const arrayPeopleWithMother = people
    .filter(el => people.some(person => person.name === el.mother));

  if (!onlyWithSon) {
    const withoutSon = arrayPeopleWithMother.map(el => {
      const mother = people.find(person => person.name === el.mother);

      return el.born - mother.born;
    });

    return averageAge(withoutSon, true);
  }

  const withSon = arrayPeopleWithMother.filter(el => el.sex === 'm').map(el => {
    const mother = people.find(person => person.name === el.mother);

    return el.born - mother.born;
  });

  return averageAge(withSon, true);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
