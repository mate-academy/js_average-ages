'use strict';

/**
* Впровадити функцію CalculateMenaverageage
 *
 * Функція повертає середній вік чоловіків у масиві.Якщо `століття" вказано тоді
 * Функція обчислює середній вік
 * лише для чоловіків, які загинули в цьому столітті
 *
 * Для обчислення століття:
 * Розділіть рік смерті людини на 100: Math.ceil (person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
// написати код тут
  // Дізнайтеся, як використовувати методи масиву, такі як .filter .map.
  // Уникайте використання петлі та передачі
  // замінити `if ()` оператор на &&, ||Або?:
  // без гніздування
  const men = people.filter(person => person.sex
    === 'm' && (!century || Math.ceil(person.died / 100) === century));
  const menAges = men.map(person => person.died - person.born);
  const menTotalAge = menAges.reduce((acc, age) => acc + age, 0);

  return menTotalAge / men.length;
}

/**
* Впровадити функцію CarculateWomenaverageage
 *
 * Функція повертає середній вік жінок у масиві.Якщо `atchildren` є
 * вказано тоді функція обчислює середній вік лише для жінок з дітьми
 *
 * Підказка: Щоб перевірити, чи є у
 * жінки дітей, ви повинні знайти когось, хто згадує
 * її як мати.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren = false) {
  const women = people.filter(person =>
    !withChildren
      ? person.sex === 'f'
      : person.sex === 'f' && people.find(mom => mom.mother === person.name)
  );

  const ages = women.map(date => date.died - date.born);
  const result = ages.reduce((sum, current) => sum + current, 0) / ages.length;

  return result;
}

/**
 * Впровадити функцію CalculateAverageGeDiff.
 *
 * Функція повертає середню різницю віку між дитиною та її або нею
 * мати в масиві.(Вік матері при народженням дитини)
 *
 * Якщо вказано `тільки withson`, то функція обчислює лише різницю у віці
 * для синів та їхніх матерів.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const mothers = people.filter(person =>
    !onlyWithSon
      ? people.find(mom => mom.mother === person.name)
      : person.sex === 'f' && people.find(mom => mom.mother === person.name)
  );
  const children = people.filter(person =>
    !onlyWithSon
      ? people.find(child => child.name === person.mother)
      : person.sex === 'm' && people.find(child => child.name === person.mother)
  );
  const difAge = children.map(child => {
    const age = mothers.find(mother => mother.name === child.mother);

    return child.born - age.born;
  });

  const result = difAge.reduce((sum, current) =>
    sum + current, 0) / difAge.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
