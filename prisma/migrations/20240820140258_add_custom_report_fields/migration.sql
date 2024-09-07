-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "ip" TEXT NOT NULL,
    "main_last_using_time" TIMESTAMP(3),
    "tool_last_using_time" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscribedUser" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "signInType" TEXT,
    "stripeCustomerId" TEXT,
    "subscription" BOOLEAN NOT NULL DEFAULT false,
    "remainingDays" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubscribedUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LighthouseReport" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "url" TEXT NOT NULL,
    "reportDesktop" JSONB NOT NULL,
    "reportMobile" JSONB NOT NULL,
    "reportDesktopCustom" JSONB NOT NULL,
    "reportMobileCustom" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LighthouseReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_ip_key" ON "User"("ip");

-- CreateIndex
CREATE UNIQUE INDEX "SubscribedUser_email_key" ON "SubscribedUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SubscribedUser_stripeCustomerId_key" ON "SubscribedUser"("stripeCustomerId");

-- AddForeignKey
ALTER TABLE "LighthouseReport" ADD CONSTRAINT "LighthouseReport_email_fkey" FOREIGN KEY ("email") REFERENCES "SubscribedUser"("email") ON DELETE CASCADE ON UPDATE CASCADE;
