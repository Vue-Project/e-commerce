import { withAuth } from "../../../utils/withAuth";
export default withAuth(async (event) => {
    return {
        isAuthenticated: true,
    };
});
