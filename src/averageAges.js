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
 * Функція повертає середній вік чоловіків у масиві. Якщо вказано "century".
 * функція обчислює середній вік тільки для чоловіків, які померли в
 * цьому столітті
 *
 * Щоб обчислити століття:
 * Розділіть рік смерті людини на 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm');

  const menSort = century
    ? men.filter(person => Math.ceil(person.died / 100) === century)
      .map(person => person.died - person.born)
    : men.map(person => person.died - person.born);

  const sumAges = menSort.reduce((x, y) => x + y);

  return Math.round((sumAges / menSort.length) * 100) / 100;

  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  // пишемо тут код
  // дізнаємося, як використовувати методи масиву, такі як .filter .map
  // .some .every .find .reduce
  // уникати використання циклів і forEach
  // замінити оператор `if ()` на &&, || чи?:
  // без гніздування
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 * * Функція повертає середній вік жінок у масиві. Якщо `withChildren` є
 * вказана функція обчислює середній вік лише для жінок з дітьми
 *
 * Підказка: щоб перевірити, чи є у жінки діти, ви повинні знайти когось, хто
 * згадає
 * її як матір.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const womenAges = withChildren
    ? people.filter(female => people.find(child =>
      child.mother === female.name))
    : people.filter(female => female.sex === 'f');

  const womanAge = womenAges.map(woman => woman.died - woman.born);

  const sumAges = womanAge.reduce((a, b) => a + b);

  return Math.round((sumAges / womenAges.length) * 100) / 100;
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
* Функція повертає середню різницю у віці між дитиною та її чи нею
 * мати в масиві. (Вік матері на момент народження дитини)
 *
 * Якщо вказано `onlyWithSon`, функція обчислює лише різницю у віці
 * для синів та їхніх матерів.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = onlyWithSon
    ? people.filter(person =>
      people.find(child => child.mother === person.name && child.sex === 'm'))
    : people.filter(person =>
      people.find(child => child.mother === person.name));

  const children = onlyWithSon
    ? people.filter(person => people.find(mother =>
      person.mother === mother.name && person.sex === 'm'))
    : people.filter(person =>
      people.find(mother => person.mother === mother.name));

  const ages = children.map(child =>
    child.born - mothers.find(mother => child.mother === mother.name).born);

  const sumAges = ages.reduce((a, b) => a + b);

  return Math.round((sumAges / ages.length) * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
