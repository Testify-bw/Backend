
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 't_cromwell',
          password: '$2a$12$FwsIOsqxHuySBM6wqUTZkOfQwjkb7PzSQ6IE7qAjIH108wdrjIWYG',
          first_name: 'Thomas',
          last_name: 'Cromwell',
          role: 'student'
        },
        {
          username: 'a_boleyn',
          password: '$2a$12$FwsIOsqxHuySBM6wqUTZkOfQwjkb7PzSQ6IE7qAjIH108wdrjIWYG',
          first_name: 'Anne',
          last_name: 'Boleyn',
          role: 'student'
        },
        {
          username: 't_wolsey',
          password: '$2a$12$FwsIOsqxHuySBM6wqUTZkOfQwjkb7PzSQ6IE7qAjIH108wdrjIWYG',
          first_name: 'Thomas',
          last_name: 'Wolsey',
          role: 'instructor'
        }
      ]);
    });
};
