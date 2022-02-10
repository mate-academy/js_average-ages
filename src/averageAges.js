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
 * Реалізуйте функцію обчислення MenAverageAge
 *
 * Функція повертає середній вік чоловіків у масиві. Якщо вказано "століття".
 * функція обчислює середній вік тільки для чоловіків, які померли в цьому
 * столітті

 * Щоб обчислити століття:
 * Розділіть рік смерті людини на 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const men = people.filter(person => {
    const cnt = century ? Math.ceil(person.died / 100) === century : true;

    return person.sex === 'm' && cnt;
  });

  const summAge = men.reduce((accum, person) => {
    return person.died - person.born + accum;
  }, 0);

  return summAge / men.length;
}

// learn how to use array methods like .filter .map .some .every .find .reduce
// avoid using loop and forEach
// replace `if ()` statement with &&, || or ?:
// without nesting
// дізнайтеся, як використовувати методи масиву, такі як .filter .map .some
// .every .find .reduce
// уникати використання циклів і forEach
// замінити оператор `if ()` на &&, || чи?:
// без гніздування

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * Реалізуйте функцію обчислення WomenAverageAge
 *
 * Функція повертає середній вік жінок у масиві. Якщо `withChildren` є
 * вказана функція обчислює середній вік лише для жінок з дітьми
 *
 * Підказка: щоб перевірити, чи є у жінки діти, знайдіть того, хто згадує
 * її як матір.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => {
    const hasChildren = withChildren ? people.some(human => {
      return human.mother === person.name;
    }) : true;

    return person.sex === 'f' && hasChildren;
  });

  const summAge = women.reduce((accum, person) => {
    return person.died - person.born + accum;
  }, 0);

  return summAge / women.length;
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
 * Реалізуйте функцію обчисленняAverageAgeDiff.
 *
 * Функція повертає середню різницю у віці між матір'ю та нею
 * дитина в масиві. (Вік матері на момент народження дитини)
 *
 * Якщо вказано `onlyWithSon`, функція обчислює лише різницю у віці
 * для матерів, які мають сина.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const chWithMother = people.filter(human => {
    const hasMother = people.some(mother => mother.name === human.mother);

    return onlyWithSon ? human.sex === 'm' && hasMother : hasMother;
  });

  const sum = chWithMother.map(person => person.born - people.find(mother => {
    return mother.name === person.mother;
  }).born).reduce((accum, motherAgeWhenBird) => accum + motherAgeWhenBird);

  return sum / chWithMother.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
