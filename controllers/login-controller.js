"use strict";

module.exports = (req, res, next) => {
    res.json({ token: 'fakeToken' })
}