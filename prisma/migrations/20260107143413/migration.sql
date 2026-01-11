-- CreateTable
CREATE TABLE "ProductStar" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "receivedStars" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductStar_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductStar" ADD CONSTRAINT "ProductStar_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
