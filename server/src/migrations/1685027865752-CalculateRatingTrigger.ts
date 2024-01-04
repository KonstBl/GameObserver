import { MigrationInterface, QueryRunner } from "typeorm"

export class CalculateRatingTrigger1685027865752 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE OR REPLACE FUNCTION calculate_average_rating()
        RETURNS TRIGGER AS $$
        BEGIN
            UPDATE "game"
            SET rating = (SELECT AVG(rating) FROM "rating" WHERE gameId = NEW.gameId)
            WHERE id = NEW.gameId;
        
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER update_game_rating
        AFTER INSERT OR UPDATE OR DELETE ON "rating"
        FOR EACH ROW
        EXECUTE FUNCTION calculate_average_rating();
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
