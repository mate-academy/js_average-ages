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
  const receiveСenturyOfLife = (obj) => {
    return Math.ceil(obj.died / 100) === century && obj.sex === 'm';
  };

  const findAllMen = (person) => person.sex === 'm';

  const men = people.filter(century
    ? receiveСenturyOfLife : findAllMen);

  return calculateAverageAge(men);
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
  const findWomanWithChild = (person) => {
    return person.sex === 'f'
    && people.find((child) => person.name === child.mother);
  };

  const findAllWomen = (woman) => woman.sex === 'f';

  const women = people.filter(withChildren ? findWomanWithChild : findAllWomen);

  return calculateAverageAge(women);
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
  const findAllWomenWithSon = (person) => {
    return person.sex === 'm'
    && people.some((mom) => mom.name === person.mother);
  };

  const findAllWomenWithChild = (person) =>
    people.some((mom) => mom.name === person.mother);

  const children = people.filter(
    onlyWithSon ? findAllWomenWithSon : findAllWomenWithChild
  );

  const yearsOld = children.map(item => {
    const mother = people.find(mom => item.mother === mom.name);

    return item.born - mother.born;
  });

  return yearsOld.reduce((acc, el) => acc + el) / yearsOld.length;
}

const calculateAverageAge = (arr) => {
  return arr.reduce((acc, el) => acc + (el.died - el.born), 0) / arr.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
