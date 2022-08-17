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
  let average = 0;
  const arrMen = people.filter(person => person.sex === 'm');
  const old = (!century)
    ? arrMen.map(men => men.died - men.born)
    : arrMen.filter(person => Math.ceil(person.died / 100) === century)
      .map(men => men.died - men.born);

  average = (old.reduce((sum, age) => sum + age, 0)) / old.length;

  return average;
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
  let average = 0;
  const arrWomen = people.filter(person => person.sex === 'f');
  const nameMothers = people.map(person => person.mother);
  const arrMothers = arrWomen.filter(person =>
    nameMothers.includes(person.name));
  const old = (!withChildren)
    ? arrWomen.map(women => women.died - women.born)
    : arrMothers.map(women => women.died - women.born);

  average = (old.reduce((sum, age) => sum + age, 0)) / old.length;

  return average;
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
  let average = 0;
  const allMothers = people.map(person => person.mother);
  const arrMothers = people.filter(person => allMothers.includes(person.name));
  const nameMothers = arrMothers.map(person => person.name);
  const arrChildren = (!onlyWithSon)
    ? people.filter(child => nameMothers.includes(child.mother))
    : people.filter(child => nameMothers.includes(child.mother)
     && child.sex === 'm');

  const ageDiffer = arrChildren.map(person => {
    const motherOfPerson = arrMothers.find(mother =>
      mother.name === person.mother);

    return person.born - motherOfPerson.born;
  });

  average = ageDiffer.reduce((sum, age) => sum + age, 0) / ageDiffer.length;

  return average;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
