export const getCurrentUser = async ( req, res ) => {
    try {
        const data = req.user;
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({message: `Get current user error: ${error}`})
    }
}