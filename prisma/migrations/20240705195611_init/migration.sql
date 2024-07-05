-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "name" CHAR(255) NOT NULL,
    "email" CHAR(50) NOT NULL,
    "password" CHAR(100) NOT NULL,
    "phone" CHAR(15) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Date" (
    "date_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Date_pkey" PRIMARY KEY ("date_id")
);

-- CreateTable
CREATE TABLE "Service" (
    "service_id" SERIAL NOT NULL,
    "name" CHAR(200) NOT NULL,
    "price" INTEGER NOT NULL,
    "date_id" INTEGER NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("service_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Date_user_id_key" ON "Date"("user_id");

-- AddForeignKey
ALTER TABLE "Date" ADD CONSTRAINT "Date_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_date_id_fkey" FOREIGN KEY ("date_id") REFERENCES "Date"("date_id") ON DELETE RESTRICT ON UPDATE CASCADE;
