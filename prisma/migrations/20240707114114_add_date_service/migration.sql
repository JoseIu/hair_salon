/*
  Warnings:

  - You are about to drop the column `date_id` on the `Service` table. All the data in the column will be lost.
  - Added the required column `date_quote` to the `Date` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_date_id_fkey";

-- AlterTable
ALTER TABLE "Date" ADD COLUMN     "date_quote" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "date_id";

-- CreateTable
CREATE TABLE "Date_service" (
    "date_id" INTEGER NOT NULL,
    "service_id" INTEGER NOT NULL,

    CONSTRAINT "Date_service_pkey" PRIMARY KEY ("date_id","service_id")
);

-- AddForeignKey
ALTER TABLE "Date_service" ADD CONSTRAINT "Date_service_date_id_fkey" FOREIGN KEY ("date_id") REFERENCES "Date"("date_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Date_service" ADD CONSTRAINT "Date_service_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("service_id") ON DELETE RESTRICT ON UPDATE CASCADE;
