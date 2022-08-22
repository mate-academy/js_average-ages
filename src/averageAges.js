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
  const arrayOfMen = people.filter(person => person.sex === 'm');
  const old = (!century)
    ? arrayOfMen.map(men => men.died - men.born)
    : arrayOfMen.filter(person => Math.ceil(person.died / 100) === century)
      .map(men => men.died - men.born);

  return (old.reduce((sum, age) => sum + age, 0)) / old.length;
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
  const arrOfWomen = people.filter(person => person.sex === 'f');
  const namesOfMothers = people.map(person => person.mother);
  const arrayOfMothers = arrOfWomen.filter(person =>
    namesOfMothers.includes(person.name));
  const old = (!withChildren)
    ? arrOfWomen.map(women => women.died - women.born)
    : arrayOfMothers.map(women => women.died - women.born);

  return (old.reduce((sum, age) => sum + age, 0)) / old.length;
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
  const allNamesOfMothers = people.map(person => person.mother);
  const arrOfMothers = people
    .filter(mother => allNamesOfMothers.includes(mother.name));
  const namesOfMothers = arrOfMothers.map(mother => mother.name);
  const arrOfChildren = (!onlyWithSon)
    ? people.filter(child => namesOfMothers.includes(child.mother))
    : people.filter(child => namesOfMothers.includes(child.mother)
     && child.sex === 'm');

  const ageDiffer = arrOfChildren.map(child => {
    const motherPerson = arrOfMothers.find(mother =>
      mother.name === child.mother);

    return child.born - motherPerson.born;
  });

  return ageDiffer.reduce((sum, age) => sum + age, 0) / ageDiffer.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
