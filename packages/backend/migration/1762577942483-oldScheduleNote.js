/*
 * SPDX-FileCopyrightText: lqvp
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export class oldScheduleNote1762577942483 {
    name = 'oldScheduleNote1762577942483'

    async up(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS "note_schedule"`);
    }

    async down(queryRunner) {
        // 元に戻せないので何もしない
    }
}
