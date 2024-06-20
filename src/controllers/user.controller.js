const getUserInfo = async (req, res) => {
    const { id, email, first_name, last_name } = req.user
    res.success('ok', {
        id,
        email,
        first_name,
        last_name
    })
}

module.exports = {
    getUserInfo
}