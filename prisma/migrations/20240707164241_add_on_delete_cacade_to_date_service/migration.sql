-- DropForeignKey
ALTER TABLE "Date_service" DROP CONSTRAINT "Date_service_date_id_fkey";

-- AddForeignKey
ALTER TABLE "Date_service" ADD CONSTRAINT "Date_service_date_id_fkey" FOREIGN KEY ("date_id") REFERENCES "Date"("date_id") ON DELETE CASCADE ON UPDATE CASCADE;
