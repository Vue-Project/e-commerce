export const computeProductReview = (product: any) => {
    if (Array.isArray(product?.stars)) {
        const totalReviews = product?._count.reviews as any;
        const starArray = product?.stars as any[];
        if (starArray.length > 0) {
            return parseInt((starArray[0].receivedStars / totalReviews).toString());
        } else {
            return 0;
        }
    }
};
