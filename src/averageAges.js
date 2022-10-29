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
  const males = !century
    ? getPersonBySex('m', people)
    : getPersonBySex('m', people).filter(male => (
      century === Math.ceil(male.died / 100)
    ));

  return getAverageAge(males);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a female has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const females = !withChildren
    ? getPersonBySex('f', people)
    : getPersonBySex('f', people).filter(female => (
      people.find(person => person.mother === female.name)
    ));

  return getAverageAge(females);
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
  const parentWithSon = onlyWithSon
    ? getMothersWithKid(people, 'm')
    : getMothers(people);

  const difference = parentWithSon.map(person =>
    person.born - people.find(mother =>
      person.mother === mother.name).born);

  const getAverageAgeDiff = difference.reduce((sum, diff) =>
    sum + diff) / difference.length;

  return getAverageAgeDiff;
}

const getAverageAge = (people) => {
  const sumAges = people.reduce((ages, persone) =>
    (persone.died - persone.born) + ages, 0);

  if (sumAges === 0) {
    return 0;
  }

  return sumAges / people.length;
};

const getPersonBySex = (sex, people) => {
  return people.filter(person => person.sex === sex);
};

const getMothers = (people) => {
  return people.filter(person =>
    people.find(mother => person.mother === mother.name));
};

const getMothersWithKid = (people, sex) => {
  if (sex === 'm') {
    return people.filter(person =>
      people.find(mother => person.mother === mother.name)
      && person.sex === 'm');
  }

  if (sex === 'f') {
    return people.filter(person =>
      people.find(mother => person.mother === mother.name)
      && person.sex === 'f');
  }

  throw new Error('Pelese specify gender');
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
