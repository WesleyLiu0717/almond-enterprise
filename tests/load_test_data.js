// -*- mode: js; indent-tabs-mode: nil; js-basic-offset: 4 -*-
//
// This file is part of Almond Cloud
//
// Copyright 2018 The Board of Trustees of The Leland Stanford Junior University
//
// Author: Giovanni Campagna <gcampagn@cs.stanford.edu>
//
// See COPYING for details
"use strict";

require('thingengine-core/lib/polyfill');
process.on('unhandledRejection', (up) => { throw up; });

const db = require('../util/db');
const user = require('../util/user');
const platform = require('../util/platform');

const req = { _(x) { return x; } };

async function main() {
    platform.init();

    await db.withTransaction(async (dbClient) => {
        await user.register(dbClient, req, {
            username: 'bob',
            password: '12345678',
            email: 'bob@localhost',
            role: 1, // default role
            approved: true,
        });
    });

    await db.tearDown();
}
main();

