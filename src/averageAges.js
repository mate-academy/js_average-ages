'use strict';

/**
 * Реализовать функцию calculateMenAverageAge
 *
 * Функция возвращает средний возраст мужчин в массиве. Если указан `век`, то
 * функция вычисляет средний возраст только для мужчин, умерших в этом веке
 *
 * Чтобы вычислить век:
 * Год смерти человека разделите на 100: Math.ceil (person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
const findAverageAge = (age) => {
  return age.reduce((count, value) =>
    count + (value.died - value.born), 0) / age.length;
};

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const ifCentryTrue = person =>
    Math.ceil(person.died / 100)
    === century && person.sex === 'm';

  const searchAllMen = (isMan) => isMan.sex === 'm';

  const men = people.filter(century
    ? ifCentryTrue : searchAllMen);

  return findAverageAge(men);
}

/**
 * Реализовать функцию calculateWomenAverageAge
 *
 * Функция возвращает среднее количество женщин в массиве.
 *  Если withChildren равно
 * указано, то функция рассчитывает средний возраст только для женщин с детьми
 *
 * Подсказка: чтобы проверить, есть ли у женщины дети,
 * найдите другую, которая упомянула
 * ее как мать.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  // write code here
  const searchAllWoman = isWoman => isWoman.sex === 'f';
  const searchWomanWithChild = person => person.sex === 'f'
  && people.find(child => person.name === child.mother);

  const woman = people.filter(withChildren
    ? searchWomanWithChild : searchAllWoman);

  return findAverageAge(woman);
}

/**

 * Реализовать функцию calculateAverageAgeDiff.
 *
 * Функция возвращает среднюю разницу в возрасте между матерью и ее
 * дочерний элемент в массиве. (Возраст матери при рождении ребенка)
 *
 * Если указано onlyWithSon, функция рассчитывает только разницу в возрасте
 * для матерей, имеющих сына.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  // write code here
  const searchMomsSon = person => person.sex === 'm'
  && people.some(mom => mom.name === person.mother);

  const searchAllMothers = person =>
    people.some(mom => mom.name === person.mother);

  const children = people.filter(
    onlyWithSon ? searchMomsSon : searchAllMothers
  );

  const diffAge = children.map(age => {
    const motherAge = people.find(mom => age.mother === mom.name);

    return age.born - motherAge.born;
  });

  return diffAge.reduce((count, val) => count + val) / diffAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
