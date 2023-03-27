'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm');

  const menInThisCentury = men.filter(person => arguments.length > 1
    ? (Math.ceil(person.died / 100) === century)
    : person);

  const averageAge = menInThisCentury.reduce((prev, person, index, array) => {
    const lived = person.died - person.born;

    return (index < array.length - 1)
      ? prev + lived
      : (prev + lived) / array.length;
  }, 0);

  return averageAge;
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => person.sex === 'f');

  const womenWithKids = women.filter(mother => withChildren
    ? people.some(someone => someone.mother === mother.name)
    : mother);

  const averageAge = womenWithKids.reduce((prev, person, index, array) => {
    const lived = person.died - person.born;

    return (index < array.length - 1)
      ? prev + lived
      : (prev + lived) / array.length;
  }, 0);

  return averageAge;
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const persons = people.filter(person => onlyWithSon
    ? person.sex === 'm'
    : person);

  const children = persons.filter(child => {
    return people.some(moter => moter.name === child.mother);
  });

  const averageAgeDiff = children.reduce((prev, child, index, array) => {
    const moter = people.find(mother => mother.name === child.mother);
    const ageMotherWhenGaveBirth = child.born - moter.born;

    return (index < array.length - 1)
      ? prev + ageMotherWhenGaveBirth
      : (prev + ageMotherWhenGaveBirth) / array.length;
  }, 0);

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
