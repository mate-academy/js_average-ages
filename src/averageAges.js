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
  const agesOfMan = [];

  for (const person of people) {
    const isSuited = century
      ? ((Math.ceil(person['died'] / 100) === century)
      && (person['sex'] === 'm'))
      : person['sex'] === 'm';

    if (isSuited) {
      agesOfMan.push(person['died'] - person['born']);
    }
  }

  const awerageAge = agesOfMan.reduce((accumulator, current, index) =>
    accumulator + current) / agesOfMan.length;

  return awerageAge;
}

function calculateWomenAverageAge(people, withChildren) {
  const agesOfWomen = people.filter(person =>
    withChildren
      ? (person['sex'] === 'f') && people.some(item =>
        item['mother'] === person['name'])
      : person['sex'] === 'f')
    .map(woman => {
      const age = woman['died'] - woman['born'];

      return age;
    });

  const awerageAge = agesOfWomen.reduce((accumulator, current, index) =>
    accumulator + current) / agesOfWomen.length;

  return awerageAge;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const women = people.filter(person =>
    (person['sex'] === 'f') && (people.find(item =>
      onlyWithSon
        ? (item['mother'] === person['name']) && (item['sex'] === 'm')
        : item['mother'] === person['name'])));

  const children = people.filter(person =>
    (onlyWithSon ? person['sex'] === 'm' : person)
    && (people.some(item =>
      item['name'] === person['mother'])));

  const generalAges = children.reduce((accum, child) =>
    accum - women.find((human) =>
      human['name'] === child['mother']).born + child.born, 0);

  return generalAges / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
