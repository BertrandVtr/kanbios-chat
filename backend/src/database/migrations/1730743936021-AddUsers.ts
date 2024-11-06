import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcryptjs';

const users = [
  {
    email: 'jp.vautrin@gmail.com',
    firstName: 'Jean-Pierre',
    lastName: 'Vautrin',
    password: 'qwertyuiop',
  },
  {
    email: 'colette.vautrin@gmail.com',
    firstName: 'Colette',
    lastName: 'Vautrin',
    password: 'qwertyuiop',
  },
  {
    email: 'magali.vautrin@gmail.com',
    firstName: 'Magali',
    lastName: 'Vautrin',
    password: 'qwertyuiop',
  },
  {
    email: 'antoine.vautrin@gmail.com',
    firstName: 'Antoine',
    lastName: 'Vautrin',
    password: 'qwertyuiop',
  },
  {
    email: 'sophie.vautrin@gmail.com',
    firstName: 'Sophie',
    lastName: 'Vautrin',
    password: 'qwertyuiop',
  },
  {
    email: 'bertrand.vautrin@gmail.com',
    firstName: 'Bertrand',
    lastName: 'Vautrin',
    password: 'qwertyuiop',
  },
];

export class AddUsers1730743936021 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await queryRunner.query(
          `INSERT INTO users ("email", "firstName", "lastName", "password", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, NOW(), NOW())`,
          [user.email, user.firstName, user.lastName, hashedPassword],
        );
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const emails = users.map(({ email }) => `'${email}'`).join(', ');
    await queryRunner.query(`DELETE FROM users WHERE email IN (${emails})`);
  }
}
