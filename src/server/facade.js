'use strict';

import Facade from './../lib/base-facade';
import log from 'bunyan';

import Client from './client';

/**
 * Server Client Facade
 *
 * @class ServerFacade
 *
 * @property {ServerClient} client
 */
export default class extends Facade {

  constructor(app) {
    super(app);

    this.client = null;
  }

  /**
   * Init Server Client.
   * @returns {Promise}
   */
  init() {
    let self = this;

    this.client = new Client(this.app);
    return this.client.connect().catch((err) => {
      self.app.log.error(err);
    });
  }
}
