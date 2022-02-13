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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const men = century ? getMenByCentury(people, century) : getAllMen(people);

  return getStatistic(men); ;
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
  // write code here
  const women = withChildren ? getAllWomenWithChildren(people, withChildren)
    : getAllWomen(people);
  const womenAverageAge = getStatistic(women);

  return womenAverageAge;
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
  // write code here
  const women = onlyWithSon ? getAllWomenWithSon(people)
    : getAllWomenWithChildren(people);
  const children = onlyWithSon ? getAllSonWithMother(people)
    : getAllChildWithMother(people);
  const diffAge = getPersonBornAvg(children, women);

  return diffAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

function getAllWomenWithSon(people) {
  return people.filter(woman => woman.sex === 'f'
    && people.some(son => son.sex === 'm' && woman.name === son.mother));
};

function getAllChildWithMother(people) {
  return people.filter(child => child.mother
    && people.some(woman => woman.name === child.mother));
};

function getAllSonWithMother(people) {
  return people.filter(son => son.sex === 'm'
    && people.some(woman => woman.name === son.mother));
};

function getPersonBornAvg(people, women) {
  return people.reduce((sum, person) =>
    sum + (person.born - women.find(woman =>
      person.mother === woman.name).born), 0) / people.length;
};

function getAllMen(people) {
  return people.filter(man => man.sex === 'm');
};

function getMenByCentury(people, century) {
  return people.filter(man => Math.ceil(man.died / 100)
    === century && man.sex === 'm');
};

function getStatistic(people) {
  return people.reduce((sum, p) =>
    (sum + (p.died - p.born)), 0) / people.length;
};

function getAllWomen(people) {
  return people.filter(woman => woman.sex === 'f');
};

function getAllWomenWithChildren(people) {
  return people.filter(woman => woman.sex === 'f'
    && people.some(child => woman.name === child.mother));
};
