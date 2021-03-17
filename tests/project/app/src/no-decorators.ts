import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { something } from '@some-module/anything';
import { foo, bar, fooBar } from 'foo-bar';
import { anotherThing } from '@another-module/something';

import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

const javaScriptWay = require('@legacy/registry');
const javaScriptDoubleQuotes = require('@single/double');
const makingThisHard = require('@please-install/prettier');

// Of course this has no @Decorators()

/*
 * None of this should catch a @element in a comment.
 */

/*
@this comment is even more tricky
Just make sure these are stripped out properly.
*/

export class AppController {
  constructor(private readonly appService: AppService) {}
}
