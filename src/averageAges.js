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
const averegeAges = arrayOfAges => {
  // ОТДЕЛЬНАЯ ФУНКЦИЯ ПО ВЫЧИСЛЕНИЮ СРЕДНЕГО ВОЗРАСТА
  return arrayOfAges.reduce((sum, person) => sum + person) / arrayOfAges.length;
};

function calculateMenAverageAge(people, century) {
  const filteredMen = people
    .filter(man => man.sex === 'm')
    .filter(man => {
      if (century) {
        return Math.ceil(man.died / 100) === century;
      } else {
        return man;
      }
    })
    .map(person => person.died - person.born);

  /* !century || Math.ceil (person.died / 100) === century) */
  return averegeAges(filteredMen);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const filteredWomen = people
    .filter(woman => woman.sex === 'f')
    .filter(woman => {
      if (withChildren) {
        return people.some(person => person.mother === woman.name);
      } else {
        return woman;
      }
    })
    .map(woman => woman.died - woman.born);

  return averegeAges(filteredWomen);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const filtered = people
    .filter(child => (onlyWithSon ? child.sex === 'm' : child))
    .filter(child => {
      // не все мамы есть в массиве,
      // поэтому мы начинаем перебирать женщин из базового массива
      return people.some(woman => child.mother === woman.name);
    })
    .map(child => {
      // find - найдёт первую женщину, подходящую условию
      const motherBorn = people.find(woman => child.mother === woman.name).born;
      return child.born - motherBorn;
    });

  return averegeAges(filtered);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
